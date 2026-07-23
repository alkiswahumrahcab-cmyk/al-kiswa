"use client";

import React, { useState, useMemo } from 'react';
import MobileDrawer from '@/components/ui/MobileDrawer';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { getSortedCountries, TOP_NATIONALITIES, getFlagEmoji } from '@/data/countries';

interface NationalitySelectorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function NationalitySelector({ value, onChange, error }: NationalitySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchStr, setSearchStr] = useState('');

    const countries = useMemo(() => getSortedCountries(), []);

    // Helper to filter
    const matchesSearch = (country: typeof countries[0], term: string) => {
        const lowerTerm = term.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!lowerTerm) return true;
        
        const nameMatch = country.name.toLowerCase().includes(term.toLowerCase());
        const codeMatch = country.code.toLowerCase().includes(lowerTerm);
        const dialMatch = country.dialCode?.replace(/[^0-9]/g, '').includes(lowerTerm);

        return nameMatch || codeMatch || dialMatch;
    };

    const filteredCountries = useMemo(() => {
        return countries.filter(c => matchesSearch(c, searchStr) && !c.disabled);
    }, [countries, searchStr]);

    const topMarkets = useMemo(() => {
        return filteredCountries.filter(c => TOP_NATIONALITIES.includes(c.code));
    }, [filteredCountries]);

    const otherMarkets = useMemo(() => {
        return filteredCountries.filter(c => !TOP_NATIONALITIES.includes(c.code));
    }, [filteredCountries]);

    const selectedCountry = countries.find(c => c.name === value);

    const handleSelect = (countryName: string) => {
        onChange(countryName);
        setIsOpen(false);
        setSearchStr('');
    };

    return (
        <div className="relative md:col-span-2">
            <MapPin className="absolute left-0 top-4 text-gold z-10 pointer-events-none" size={20} />
            <button
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-controls="nationality-listbox"
                onClick={() => setIsOpen(true)}
                className={`w-full flex items-center justify-between pl-8 pr-4 py-4 bg-n-900 border-b-2 text-left outline-none transition-colors ${error ? 'border-red-500' : 'border-border hover:border-gold focus:border-gold'}`}
            >
                <span className={`text-base font-medium truncate ${value ? 'text-ink' : 'text-muted'}`}>
                    {selectedCountry ? (
                        <span className="flex items-center gap-2">
                            <span className="text-xl leading-none">{getFlagEmoji(selectedCountry.code)}</span>
                            {selectedCountry.name}
                        </span>
                    ) : (
                        'Select your nationality *'
                    )}
                </span>
                <ChevronDown size={20} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {error && <p className="text-red-500 text-xs mt-1 absolute pl-8">{error}</p>}

            <MobileDrawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Select Nationality"
            >
                <div className="p-4 border-b border-border relative sticky top-0 bg-surface z-10">
                    <Search size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        autoFocus
                        value={searchStr}
                        onChange={(e) => setSearchStr(e.target.value)}
                        placeholder="Search country, code, or +1..."
                        className="w-full pl-12 pr-4 py-3 bg-surface-sunken border border-border-strong rounded-md text-base text-ink placeholder-muted outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-sm"
                    />
                </div>
                <div 
                    id="nationality-listbox" 
                    role="listbox" 
                    className="max-h-[60vh] md:max-h-80 overflow-y-auto custom-scrollbar pb-6"
                >
                    {filteredCountries.length === 0 ? (
                        <div className="p-6 text-center text-muted">No countries found</div>
                    ) : (
                        <>
                            {topMarkets.length > 0 && (
                                <div className="mb-2">
                                    <div className="px-6 py-2 text-xs font-bold text-gold uppercase tracking-widest bg-surface-alt">Top Markets</div>
                                    {topMarkets.map(country => (
                                        <button
                                            key={country.code}
                                            role="option"
                                            aria-selected={value === country.name}
                                            type="button"
                                            onClick={() => handleSelect(country.name)}
                                            className="w-full px-6 py-3 md:py-4 text-left hover:bg-gold/10 text-muted hover:text-ink border-b border-border last:border-0 transition-colors flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl leading-none">{getFlagEmoji(country.code)}</span>
                                                <span className="font-medium">{country.name}</span>
                                            </div>
                                            {country.dialCode && (
                                                <span className="text-xs text-muted group-hover:text-muted">{country.dialCode}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {otherMarkets.length > 0 && (
                                <div>
                                    {topMarkets.length > 0 && (
                                        <div className="px-6 py-2 text-xs font-bold text-muted uppercase tracking-widest bg-surface-alt">All Countries</div>
                                    )}
                                    {otherMarkets.map(country => (
                                        <button
                                            key={country.code}
                                            role="option"
                                            aria-selected={value === country.name}
                                            type="button"
                                            onClick={() => handleSelect(country.name)}
                                            className="w-full px-6 py-3 md:py-4 text-left hover:bg-gold/10 text-muted hover:text-ink border-b border-border last:border-0 transition-colors flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl leading-none">{getFlagEmoji(country.code)}</span>
                                                <span className="font-medium">{country.name}</span>
                                            </div>
                                            {country.dialCode && (
                                                <span className="text-xs text-muted group-hover:text-muted">{country.dialCode}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </MobileDrawer>
        </div>
    );
}
