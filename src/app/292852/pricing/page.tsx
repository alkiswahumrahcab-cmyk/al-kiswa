'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Save, Search, RotateCcw } from 'lucide-react';
import styles from '../admin.module.css';
import { Toast } from '@/components/ui/Toast';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';

const PasswordConfirmModal = dynamic(() => import('@/components/admin/PasswordConfirmModal'), { ssr: false });


interface Route {
    id: string;
    origin: string;
    destination: string;
}

interface Vehicle {
    id: string;
    name: string;
}

interface RoutePrice {
    routeId: string;
    vehicleId: string;
    price: number;
    priceUSD?: number;
}

// Memoized Cell Component to prevent table re-renders on typing
const PriceCell = memo(({
    routeId,
    vehicleId,
    initialValue,
    onSave,
    isModified
}: {
    routeId: string;
    vehicleId: string;
    initialValue: number;
    onSave: (routeId: string, vehicleId: string, value: number) => void;
    isModified: boolean;
}) => {
    const [value, setValue] = useState(initialValue.toString());

    // Sync with external changes if needed (e.g. after save)
    useEffect(() => {
        setValue(initialValue?.toString() || '0');
    }, [initialValue]);

    const handleBlur = () => {
        const numValue = parseFloat(value) || 0;
        if (numValue !== initialValue) {
            onSave(routeId, vehicleId, numValue);
        }
    };

    return (
        <td className="p-3 border-b border-border text-center">
            <div className="relative group inline-block">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-24 px-2 py-1.5 text-center bg-transparent border border-transparent rounded-lg hover:bg-surface-sunken focus:bg-surface focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all ${isModified ? 'text-gold-strong font-extrabold' : 'text-ink font-medium'
                        }`}
                />
                {isModified && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(226,163,54,0.6)]" />
                )}
            </div>
        </td>
    );
});

PriceCell.displayName = 'PriceCell';

import { Settings } from '@/lib/validations';

// ... (existing imports)

export default function PricingPage() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [pricesUSD, setPricesUSD] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modified, setModified] = useState<Record<string, boolean>>({});
    const [modifiedUSD, setModifiedUSD] = useState<Record<string, boolean>>({});
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [activeCurrency, setActiveCurrency] = useState<'SAR' | 'USD'>('SAR');
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Security Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({ isOpen: false, title: '', message: '', onConfirm: () => { } });

    const showToast = useCallback((message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const [routesRes, vehiclesRes, pricesRes, settingsRes] = await Promise.all([
                fetch('/api/admin/routes'),
                fetch('/api/admin/fleet'),
                fetch('/api/admin/pricing'),
                fetch('/api/settings')
            ]);

            const routesData = await routesRes.json();
            const vehiclesData = await vehiclesRes.json();
            const pricesData = await pricesRes.json();
            const settingsData = await settingsRes.json();

            if (Array.isArray(routesData)) {
                setRoutes(routesData);
            } else {
                setRoutes([]);
            }

            setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);

            const priceMap: Record<string, number> = {};
            const priceUSDMap: Record<string, number> = {};
            pricesData.forEach((p: RoutePrice) => {
                priceMap[`${p.routeId}-${p.vehicleId}`] = p.price;
                if (p.priceUSD !== undefined) {
                    priceUSDMap[`${p.routeId}-${p.vehicleId}`] = p.priceUSD;
                }
            });
            setPrices(priceMap);
            setPricesUSD(priceUSDMap);

            if (settingsData && !settingsData.error) {
                setSettings(settingsData);
            }

        } catch (error) {
            console.error('Failed to fetch data:', error);
            showToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCellSave = useCallback((routeId: string, vehicleId: string, newValue: number) => {
        const key = `${routeId}-${vehicleId}`;
        if (activeCurrency === 'SAR') {
            setPrices(prev => ({ ...prev, [key]: newValue }));
            setModified(prev => ({ ...prev, [key]: true }));
        } else {
            setPricesUSD(prev => ({ ...prev, [key]: newValue }));
            setModifiedUSD(prev => ({ ...prev, [key]: true }));
        }
    }, [activeCurrency]);

    const handleReset = () => {
        if (Object.keys(modified).length === 0 && Object.keys(modifiedUSD).length === 0) return;

        setConfirmDialog({
            isOpen: true,
            title: 'Discard Changes',
            message: 'Are you sure you want to discard all unsaved changes?',
            onConfirm: () => {
                setModified({});
                setModifiedUSD({});
                fetchData(); // Refetch to reset values
                showToast('Changes discarded', 'success');
                setConfirmDialog(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleSaveGlobalSettings = async () => {
        if (!settings) return;
        setIsSavingSettings(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                showToast('Global pricing adjustment saved!', 'success');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            showToast('Error saving settings', 'error');
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleSaveAll = async () => {
        setIsPasswordModalOpen(true);
    };

    const handleFinalSaveAll = async () => {
        setIsPasswordModalOpen(false);
        setSaving(true);
        try {
            // Combine all keys from prices and pricesUSD
            const allKeys = new Set([...Object.keys(prices), ...Object.keys(pricesUSD)]);
            const promises = Array.from(allKeys).map((key) => {
                // Only save if modified in either currency
                if (!modified[key] && !modifiedUSD[key]) return Promise.resolve();

                const [routeId, vehicleId] = key.split('-');
                return fetch('/api/admin/pricing', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        routeId, 
                        vehicleId, 
                        price: prices[key], 
                        priceUSD: pricesUSD[key] 
                    }),
                });
            });
            await Promise.all(promises);
            setModified({});
            setModifiedUSD({});
            showToast('All changes saved successfully!', 'success');
        } catch (error) {
            console.error('Failed to save all prices:', error);
            showToast('Error saving prices', 'error');
        } finally {
            setSaving(false);
        }
    };

    const filteredRoutes = routes.filter(route =>
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">Loading pricing data...</div>;

    return (
        <div className="p-6 max-w-[95%] mx-auto space-y-8">
            {toast && <Toast message={toast.message} type={toast.type} isVisible={true} onClose={() => setToast(null)} />}

            {/* Header and Currency Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className={styles.title}>Price Management</h1>
                    <p className="text-muted">Manage dynamic pricing for routes and vehicles</p>
                </div>
                
                <div className="flex bg-surface-sunken p-1.5 rounded-xl border border-border">
                    <button
                        onClick={() => setActiveCurrency('SAR')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            activeCurrency === 'SAR' 
                            ? 'bg-gold-soft text-gold-strong shadow-sm border border-gold-line' 
                            : 'text-muted hover:text-ink hover:bg-surface border border-transparent'
                        }`}
                    >
                        SAR (ر.س)
                    </button>
                    <button
                        onClick={() => setActiveCurrency('USD')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            activeCurrency === 'USD' 
                            ? 'bg-info-soft text-info shadow-sm border border-info' 
                            : 'text-muted hover:text-ink hover:bg-surface border border-transparent'
                        }`}
                    >
                        USD ($)
                    </button>
                </div>
            </div>

            {/* Global Adjustment Card */}
            {settings && (
                <div className="bg-surface-alt border border-border p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                            <RotateCcw className="text-gold" size={20} />
                            Global Price Adjustment
                        </h2>
                        <p className="text-muted text-sm mt-2">
                            Increase or decrease ALL prices on the website by a percentage.
                            <br />
                            <span className="text-xs text-muted inline-block mt-1">Example: <span className="text-success font-bold">+10</span> = 10% Increase | <span className="text-error font-bold">-10</span> = 10% Discount</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <input
                                type="number"
                                value={settings.pricing?.globalPercentageAdjustment || 0}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    pricing: { ...settings.pricing, globalPercentageAdjustment: parseFloat(e.target.value) || 0 }
                                })}
                                className="bg-surface border border-border rounded-xl px-4 py-3 text-ink text-xl font-bold w-32 focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow text-center shadow-inner"
                                placeholder="0"
                            />
                        </div>
                        <button
                            onClick={handleSaveGlobalSettings}
                            disabled={isSavingSettings}
                            className="btn-primary px-8 py-3.5 rounded-xl font-bold whitespace-nowrap"
                        >
                            {isSavingSettings ? 'Saving...' : 'Apply Adjustment'}
                        </button>
                    </div>
                </div>
            )}


            {/* Table Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                <div className="relative flex-1 md:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search routes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-surface border border-border rounded-full focus:ring-2 focus:ring-gold/30 outline-none transition-all text-ink shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    {(Object.keys(modified).length > 0 || Object.keys(modifiedUSD).length > 0) && (
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 bg-surface-sunken text-muted px-4 py-2.5 rounded-btn font-bold hover:bg-surface-alt hover:text-ink transition-colors"
                        >
                            <RotateCcw size={18} />
                            Reset Changes
                        </button>
                    )}

                    <button
                        onClick={handleSaveAll}
                        disabled={saving || (Object.keys(modified).length === 0 && Object.keys(modifiedUSD).length === 0)}
                        className="flex items-center gap-2 btn-primary px-6 py-2.5 rounded-btn shadow-md whitespace-nowrap"
                    >
                        <Save size={20} />
                        {saving ? 'Saving...' : 'Save Table Changes'}
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[calc(100vh-280px)] relative">
                    <table className="w-full border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-surface-alt shadow-sm ring-1 ring-border">
                            <tr>
                                <th className="bg-surface-alt min-w-[220px] p-4 text-left border-b border-border">
                                    <span className="text-xs uppercase tracking-wider text-muted font-bold">Route / Vehicle</span>
                                </th>
                                {vehicles.map(vehicle => (
                                    <th key={vehicle.id} className="text-center min-w-[150px] p-4 border-b border-border bg-surface-alt">
                                        <span className="text-xs uppercase tracking-wider text-muted font-bold">{vehicle.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoutes.map(route => (
                                <tr key={route.id} className="hover:bg-surface-alt transition-colors group">
                                    <td className="p-4 border-b border-border bg-surface sticky left-0 group-hover:bg-surface-alt transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-ink text-sm font-semibold">{route.origin}</span>
                                            <span className="text-xs text-muted flex items-center gap-1 mt-0.5">
                                                to <span className="text-muted">{route.destination}</span>
                                            </span>
                                        </div>
                                    </td>
                                    {vehicles.map(vehicle => {
                                        const key = `${route.id}-${vehicle.id}`;
                                        const val = activeCurrency === 'SAR' ? (prices[key] || 0) : (pricesUSD[key] || 0);
                                        const isMod = activeCurrency === 'SAR' ? !!modified[key] : !!modifiedUSD[key];
                                        return (
                                            <PriceCell
                                                key={vehicle.id}
                                                routeId={route.id}
                                                vehicleId={vehicle.id}
                                                initialValue={val}
                                                onSave={handleCellSave}
                                                isModified={isMod}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredRoutes.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">
                            No routes found matching &quot;{searchTerm}&quot;
                        </div>
                    )}
                </div>
            </div>

            <AdminConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={confirmDialog.onConfirm}
                onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                isDestructive={true}
            />

            <PasswordConfirmModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={handleFinalSaveAll}
                title="Confirm Pricing Changes"
                description="Please enter your admin password to update these prices."
                actionLabel="Save Prices"
            />
        </div>
    );
}
