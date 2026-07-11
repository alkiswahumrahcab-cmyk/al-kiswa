/**
 * src/lib/chat/livePricing.ts
 *
 * Fetches live pricing data from MongoDB (the same source as the admin panel),
 * with a short in-process cache to avoid hammering the DB on every chat turn.
 *
 * The admin panel writes prices to:
 *   - Route collection  (origin, destination, distance, duration, category)
 *   - RoutePrice collection (route id → vehicle id → price SAR / price USD)
 *
 * This module normalises both into a simple flat structure that the assistant
 * and the knowledge base builder can consume without any pricing.json imports.
 */

import dbConnect from '@/lib/mongodb';
import { Route, RoutePrice } from '@/models';

// ---------------------------------------------------------------------------
// Normalised types (shared between knowledge.ts and route.ts)
// ---------------------------------------------------------------------------

export interface LiveRouteEntry {
  id: string;
  /** Human-readable route name, e.g. "Jeddah Airport → Makkah Hotel" */
  name: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  category: string;
  /** vehicleId → SAR price */
  customRates: Record<string, number>;
  /** vehicleId → USD price (optional) */
  customRatesUSD: Record<string, number>;
}

export interface LivePricingData {
  routes: LiveRouteEntry[];
  fetchedAt: number; // ms timestamp
}

// ---------------------------------------------------------------------------
// In-process cache — 5 minute TTL
// This keeps a single warm copy per Node.js process instance.
// ---------------------------------------------------------------------------
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let _cache: LivePricingData | null = null;

/** Clear the cache (called after admin saves prices, if needed). */
export function clearLivePricingCache(): void {
  _cache = null;
}

// ---------------------------------------------------------------------------
// Core fetch — reads Route + RoutePrice from MongoDB
// ---------------------------------------------------------------------------
async function fetchLivePricing(): Promise<LivePricingData> {
  await dbConnect();

  // Fetch all active routes
  const routes = await Route.find({ isActive: true }).lean();

  // Fetch all prices in one query, then group by route id
  const allPrices = await RoutePrice.find({}).lean();

  const pricesByRoute = new Map<string, Record<string, number>>();
  const pricesUSDByRoute = new Map<string, Record<string, number>>();

  for (const rp of allPrices) {
    const routeId = rp.route.toString();
    if (!pricesByRoute.has(routeId)) pricesByRoute.set(routeId, {});
    if (!pricesUSDByRoute.has(routeId)) pricesUSDByRoute.set(routeId, {});

    const vehicleKey = String(rp.vehicle).toLowerCase().replace(/\s+/g, '');
    pricesByRoute.get(routeId)![vehicleKey] = rp.price;
    if (rp.priceUSD != null) {
      pricesUSDByRoute.get(routeId)![vehicleKey] = rp.priceUSD;
    }
  }

  const liveRoutes: LiveRouteEntry[] = routes.map((r: any) => {
    const id = r._id.toString();
    const origin = r.origin ?? '';
    const destination = r.destination ?? '';
    return {
      id,
      name: `${origin} to ${destination}`,
      origin,
      destination,
      distance: r.distance ?? '—',
      duration: r.duration ?? '—',
      category: r.category ?? 'Intercity',
      customRates: pricesByRoute.get(id) ?? {},
      customRatesUSD: pricesUSDByRoute.get(id) ?? {},
    };
  });

  return { routes: liveRoutes, fetchedAt: Date.now() };
}

// ---------------------------------------------------------------------------
// Public API — returns cached data, refreshes if stale
// ---------------------------------------------------------------------------
export async function getLivePricing(): Promise<LivePricingData> {
  if (_cache && Date.now() - _cache.fetchedAt < CACHE_TTL_MS) {
    return _cache;
  }

  try {
    _cache = await fetchLivePricing();
    return _cache;
  } catch (err) {
    console.error('[livePricing] Failed to fetch live pricing from DB:', err);

    // If we have a stale cache, serve it rather than crashing
    if (_cache) {
      console.warn('[livePricing] Serving stale cache due to DB error.');
      return _cache;
    }

    // Last resort: return empty so the assistant can fall back gracefully
    return { routes: [], fetchedAt: Date.now() };
  }
}
