'use client';

import React from 'react';
import Image from 'next/image';
import { Download, CheckCircle, Printer } from 'lucide-react';
import { format } from 'date-fns';

interface ReceiptProps {
    bookingData: {
        id: string;
        name: string;
        email: string;
        phone: string;
        pickupLocation: string;
        dropoffLocation: string;
        date: string | Date;
        time: string;
        routeName: string;
        vehicleName: string;
        passengers: number;
        currency: string;
        totalAmount: number;
        status?: string;
        airportTerminal?: string;
        parkingFee?: number;
        flightNumbers?: string;
    };
    onClose?: () => void;
}

export default function Receipt({ bookingData, onClose }: ReceiptProps) {
    const handlePrint = () => {
        window.print();
    };

    const formattedDate = bookingData.date instanceof Date 
        ? format(bookingData.date, 'dd MMM yyyy') 
        : format(new Date(bookingData.date), 'dd MMM yyyy');

    return (
        <div className="w-full max-w-2xl mx-auto bg-white text-n-900 rounded-2xl shadow-2xl overflow-hidden relative" id="receipt-container">
            {/* Header / Brand */}
            <div className="bg-charcoal p-6 flex items-center justify-between border-b-4 border-gold">
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-white rounded-xl p-2 border border-gold/30">
                        <Image 
                            src="/logo-dark.svg" 
                            alt="Al Kiswah" 
                            fill 
                            sizes="64px" 
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Al Kiswah Transport</h2>
                        <p className="text-gold text-xs tracking-widest uppercase">Official Booking Receipt</p>
                    </div>
                </div>
                <div className="text-right text-white">
                    <CheckCircle className="w-8 h-8 text-green-500 ml-auto mb-1" />
                    <p className="text-xs font-medium text-n-300">Booking Confirmed</p>
                </div>
            </div>

            {/* Receipt Body */}
            <div className="p-8">
                <div className="flex justify-between items-end border-b border-n-200 pb-6 mb-6">
                    <div>
                        <p className="text-sm text-n-500 uppercase tracking-wide font-medium">Receipt No.</p>
                        <p className="text-lg font-bold text-n-900">{bookingData.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-n-500 uppercase tracking-wide font-medium">Date</p>
                        <p className="text-base font-semibold text-n-900">{format(new Date(), 'dd MMM yyyy')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Passenger Details */}
                    <div>
                        <h3 className="text-sm text-gold uppercase tracking-wider font-bold mb-3">Passenger Info</h3>
                        <div className="space-y-2">
                            <p className="text-base font-bold text-n-900">{bookingData.name}</p>
                            <p className="text-sm text-n-600">{bookingData.email}</p>
                            <p className="text-sm text-n-600">{bookingData.phone}</p>
                            <p className="text-sm text-n-600 mt-2 bg-n-50 inline-block px-2 py-1 rounded">
                                {bookingData.passengers} Passenger(s)
                            </p>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div>
                        <h3 className="text-sm text-gold uppercase tracking-wider font-bold mb-3">Trip Details</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-n-500 font-medium">Route / Service</p>
                                <p className="text-sm font-semibold text-n-900">{bookingData.routeName}</p>
                            </div>
                            {bookingData.airportTerminal && (
                                <div>
                                    <p className="text-xs text-n-500 font-medium">Terminal</p>
                                    <p className="text-sm font-bold text-amber-600">{bookingData.airportTerminal}</p>
                                </div>
                            )}
                            {bookingData.flightNumbers && (
                                <div>
                                    <p className="text-xs text-n-500 font-medium">Flight Number(s)</p>
                                    <p className="text-sm font-semibold text-n-900">{bookingData.flightNumbers}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-n-500 font-medium">Vehicle</p>
                                <p className="text-sm font-semibold text-n-900">{bookingData.vehicleName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-n-500 font-medium">Pickup Date</p>
                                    <p className="text-sm font-semibold text-n-900">{formattedDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-n-500 font-medium">Time</p>
                                    <p className="text-sm font-semibold text-n-900">{bookingData.time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locations */}
                <div className="bg-n-50 rounded-xl p-4 mb-8 border border-n-100">
                    <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-n-300">
                        <div className="relative mb-4">
                            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-gold border-2 border-white shadow-sm" />
                            <p className="text-xs text-n-500 font-medium">Pickup Location</p>
                            <p className="text-sm font-semibold text-n-900">{bookingData.pickupLocation}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-charcoal border-2 border-white shadow-sm" />
                            <p className="text-xs text-n-500 font-medium">Dropoff Location</p>
                            <p className="text-sm font-semibold text-n-900">{bookingData.dropoffLocation}</p>
                        </div>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-n-50 rounded-xl p-6 mb-8 border border-n-100">
                    <h3 className="text-sm text-n-500 uppercase tracking-wider font-bold mb-4">Payment Summary</h3>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-n-600 text-sm">
                            <span>Base Fare</span>
                            <span>{bookingData.totalAmount - (bookingData.parkingFee || 0)} {bookingData.currency}</span>
                        </div>
                        
                        {bookingData.parkingFee ? (
                            <div className="flex justify-between items-center text-amber-700 text-sm font-medium">
                                <span>{bookingData.airportTerminal} Parking Fee</span>
                                <span>+{bookingData.parkingFee} {bookingData.currency}</span>
                            </div>
                        ) : null}

                        <div className="pt-3 border-t border-n-200"></div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-n-900">Total Paid</span>
                            <span className="text-2xl font-black text-gold">
                                {bookingData.totalAmount} {bookingData.currency}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="text-center space-y-3">
                    {bookingData.flightNumbers && (
                        <p className="text-sm text-blue-600 bg-blue-50 py-2 px-3 rounded text-left border border-blue-100 mb-4">
                            <strong>Note:</strong> 90 minutes waiting time is free after your flight lands. Additional waiting will be charged at 30 SAR per hour, payable directly to the driver.
                        </p>
                    )}
                    <p className="text-xs text-n-500">
                        {bookingData.parkingFee ? 
                            `Note: Total includes a mandatory parking fee for ${bookingData.airportTerminal || 'airport'}.` :
                            "Please keep this receipt for your records. Show this to your driver upon arrival."
                        }
                    </p>
                    <p className="text-xs text-n-400">Thank you for choosing Al Kiswah Umrah Transport. For support, contact us via WhatsApp at +966 54 870 7332</p>
                </div>
            </div>

            {/* Action Buttons (Hidden when printing) */}
            <div className="p-6 bg-n-50 border-t border-n-200 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
                <button 
                    onClick={handlePrint}
                    className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-n-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                    <Printer className="w-5 h-5" />
                    Print / Save PDF
                </button>
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-n-100 text-n-900 border border-n-200 px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                        Return Home
                    </button>
                )}
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #receipt-container, #receipt-container * {
                        visibility: visible;
                    }
                    #receipt-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        max-width: 100%;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
