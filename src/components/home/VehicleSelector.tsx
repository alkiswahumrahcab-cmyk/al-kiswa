'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle } from '@/lib/pricing';
import { Users, Briefcase, CheckCircle2, ChevronDown, Car } from 'lucide-react';
import styles from './VehicleSelector.module.css';

interface VehicleSelectorProps {
    vehicles: Vehicle[];
    selectedVehicleId: string;
    onSelect: (vehicleId: string) => void;
}

export default function VehicleSelector({ vehicles, selectedVehicleId, onSelect }: VehicleSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <div className={styles.triggerContent}>
                    <div className={styles.triggerIconWrapper}>
                        <Car size={20} />
                    </div>
                    <div className={styles.vehicleInfo}>
                        <span className={styles.label}>Select Vehicle Class</span>
                        <span className={styles.value}>{selectedVehicle?.name || 'Choose a vehicle'}</span>
                    </div>
                </div>
                <ChevronDown size={20} className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.list}>
                            {vehicles.map((vehicle) => {
                                const Icon = vehicle.icon;
                                const isSelected = selectedVehicleId === vehicle.id;
                                return (
                                    <button
                                        key={vehicle.id}
                                        className={`${styles.option} ${isSelected ? styles.selectedOption : ''}`}
                                        onClick={() => {
                                            onSelect(vehicle.id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className={styles.optionIcon}>
                                            <Icon size={20} />
                                        </div>
                                        <div className={styles.optionContent}>
                                            <span className={styles.optionName}>{vehicle.name}</span>
                                            <div className={styles.optionMeta}>
                                                <span className="flex items-center gap-1"><Users size={12} /> {vehicle.capacity}</span>
                                                <span className="flex items-center gap-1"><Briefcase size={12} /> {vehicle.luggage}</span>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className={styles.selectedIndicator}>
                                                <CheckCircle2 size={16} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
