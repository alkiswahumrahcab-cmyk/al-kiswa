'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSettings } from './SettingsContext';

type Currency = 'SAR' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    exchangeRate: number;
    toggleCurrency: () => void;
    setCurrency: (c: Currency) => void;
    formatPrice: (priceInSar: number) => { amount: number; formatted: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>('SAR');
    const { settings } = useSettings();
    
    // Fallback to 3.75 if not defined in settings
    const exchangeRate = settings && (settings as any).exchange_rate 
        ? parseFloat((settings as any).exchange_rate) 
        : 3.75;

    useEffect(() => {
        // Load preference from localStorage
        const stored = localStorage.getItem('preferredCurrency');
        if (stored === 'SAR' || stored === 'USD') {
            setCurrencyState(stored);
        }
    }, []);

    const setCurrency = (c: Currency) => {
        setCurrencyState(c);
        localStorage.setItem('preferredCurrency', c);
    };

    const toggleCurrency = () => {
        setCurrency(currency === 'SAR' ? 'USD' : 'SAR');
    };

    const formatPrice = (priceInSar: number) => {
        if (currency === 'SAR') {
            return {
                amount: priceInSar,
                formatted: `${priceInSar} SAR`
            };
        } else {
            const amountInUsd = Math.round(priceInSar / exchangeRate);
            return {
                amount: amountInUsd,
                formatted: `$${amountInUsd}`
            };
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, exchangeRate, toggleCurrency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
