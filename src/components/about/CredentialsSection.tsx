'use client';

import React from 'react';
import FadeIn from '@/components/common/FadeIn';
import { ShieldCheck, FileText, CheckCircle, Award } from 'lucide-react';

export default function CredentialsSection() {
    return (
        <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-sm font-semibold mb-4">
                            <ShieldCheck size={16} />
                            <span>Verified & Licensed</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
                            Official Credentials & E-E-A-T
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            We are a registered and licensed Umrah transport operator in the Kingdom of Saudi Arabia, adhering to the highest safety and regulatory standards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Licence Placeholder */}
                        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                <FileText size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Transport Licence</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Ministry of Transport</p>
                            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg inline-block text-sm font-mono font-bold text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                ID: [PENDING_UPDATE]
                            </div>
                        </div>

                        {/* CR Placeholder */}
                        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Commercial Registration</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Ministry of Commerce</p>
                            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg inline-block text-sm font-mono font-bold text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                CR: [PENDING_UPDATE]
                            </div>
                        </div>

                        {/* Fleet Safety */}
                        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Safety Standards</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Fleet Maintenance</p>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle size={16} /> 100% Compliant
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Trusted Provider</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Umrah Operations</p>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle size={16} /> Verified Experience
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
