import { describe, it, expect } from 'vitest';
import { FLEET, formatSeats } from './fleet';
import fs from 'fs';
import path from 'path';

describe('Fleet Data', () => {
  it('every id is unique', () => {
    const ids = FLEET.map(v => v.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('every slug maps to an existing route OR hasDetailPage is false', () => {
    const appDir = path.resolve(__dirname, '../app/(public)/fleet');
    
    FLEET.forEach(vehicle => {
      if (vehicle.hasDetailPage) {
        const routePath = path.join(appDir, vehicle.slug);
        const routeExists = fs.existsSync(routePath);
        expect(routeExists).toBe(true, `Route does not exist for: ${vehicle.slug}`);
      }
    });
  });

  it('seats and luggage are positive integers', () => {
    FLEET.forEach(vehicle => {
      expect(
        Number.isInteger(vehicle.seats),
        `${vehicle.id} seats must be a number, but got ${vehicle.seats}`
      ).toBe(true);
      expect(vehicle.seats as number).toBeGreaterThan(0);
      
      expect(
        Number.isInteger(vehicle.luggage),
        `${vehicle.id} luggage must be a number, but got ${vehicle.luggage}`
      ).toBe(true);
      expect(vehicle.luggage as number).toBeGreaterThan(0);
    });
  });

  it('fails if any seats or luggage value is TODO or null', () => {
    FLEET.forEach(vehicle => {
      expect(vehicle.seats).not.toBe('TODO');
      expect(vehicle.seats).not.toBeNull();
      expect(vehicle.luggage).not.toBe('TODO');
      expect(vehicle.luggage).not.toBeNull();
    });
  });

  it('no two vehicles share a display name', () => {
    const names = FLEET.map(v => v.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });
  
  it('formatSeats never emits "Pax Pax"', () => {
    FLEET.forEach(vehicle => {
      const formatted = formatSeats(vehicle);
      expect(formatted).not.toContain('Pax Pax');
    });
  });
});
