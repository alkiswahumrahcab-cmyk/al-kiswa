'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';

interface MapAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    icon?: React.ReactNode;
    className?: string; // Wrapper class validation
    inputClassName?: string; // Direct input class override
    label?: string;
    error?: string;
}

declare global {
    interface Window {
        google: any;
        initMapAutocomplete?: () => void;
    }
}

const MapAutocomplete: React.FC<MapAutocompleteProps> = ({
    value,
    onChange,
    placeholder,
    className = '', // Default empty
    inputClassName = '',
    label,
    error
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const autocompleteRef = useRef<any>(null);

    useEffect(() => {
        if (!window.google) return;

        const initAutocomplete = () => {
            if (!inputRef.current) return;

            autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                componentRestrictions: { country: "sa" },
                fields: ["address_components", "formatted_address", "geometry", "name"],
                types: ["establishment", "geocode"]
            });

            autocompleteRef.current.addListener("place_changed", () => {
                const place = autocompleteRef.current.getPlace();
                if (place.formatted_address) {
                    onChange(place.formatted_address);
                } else if (place.name) {
                    onChange(place.name);
                }
            });
        };

        initAutocomplete();

        return () => {
            if (window.google.maps.event) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, []);

    const handleClear = () => {
        onChange('');
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}
            <div className="relative group w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors pointer-events-none z-10">
                    <MapPin size={20} />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={inputClassName || `
                        w-full pl-12 pr-10 py-4 bg-white dark:bg-slate-900 
                        border-2 border-slate-100 dark:border-slate-800 
                        rounded-2xl outline-none transition-all
                        focus:border-gold-primary/50 focus:ring-4 focus:ring-gold-primary/10
                        text-charcoal dark:text-white placeholder:text-gray-400
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
                    `}
                />

                {value && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors z-20"
                    >
                        <X size={18} />
                    </button>
                )}

                {isLoading && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                        <Loader2 size={18} className="animate-spin text-gold-primary" />
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-red-500 font-medium ml-1">{error}</span>}
        </div>
    );
};

export default MapAutocomplete;
