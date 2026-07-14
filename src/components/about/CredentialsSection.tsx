'use client';

import React from 'react';
import FadeIn from '@/components/common/FadeIn';
import { ShieldCheck, FileText, CheckCircle, Award } from 'lucide-react';

export default function CredentialsSection() {
    return (
        <section className="py-20 bg-surface border-y border-border">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold-strong text-sm font-semibold mb-4">
                            <ShieldCheck size={16} />
                            <span>Verified & Licensed</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-ink mb-6">
                            Official Credentials & E-E-A-T
                        </h2>
                        <p className="text-lg text-ink-muted">
                            We are a registered and licensed Umrah transport operator in the Kingdom of Saudi Arabia, adhering to the highest safety and regulatory standards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Licence Placeholder */}
                        <div className="bg-surface-alt p-8 rounded-2xl text-center border border-border hover:border-gold transition-colors">
                            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold-strong">
                                <FileText size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-ink mb-2">Transport Licence</h3>
                            <p className="text-ink-muted mb-4 text-sm">Ministry of Transport</p>
                            <div className="bg-surface px-4 py-2 rounded-lg inline-block text-sm font-mono font-bold text-ink border border-border">
                                ID: [PENDING_UPDATE]
                            </div>
                        </div>

                        {/* CR Placeholder */}
                        <div className="bg-surface-alt p-8 rounded-2xl text-center border border-border hover:border-gold transition-colors">
                            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold-strong">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-ink mb-2">Commercial Registration</h3>
                            <p className="text-ink-muted mb-4 text-sm">Ministry of Commerce</p>
                            <div className="bg-surface px-4 py-2 rounded-lg inline-block text-sm font-mono font-bold text-ink border border-border">
                                CR: [PENDING_UPDATE]
                            </div>
                        </div>

                        {/* Fleet Safety */}
                        <div className="bg-surface-alt p-8 rounded-2xl text-center border border-border hover:border-gold transition-colors">
                            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold-strong">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-ink mb-2">Safety Standards</h3>
                            <p className="text-ink-muted mb-4 text-sm">Fleet Maintenance</p>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-gold-strong">
                                <CheckCircle size={16} /> 100% Compliant
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-surface-alt p-8 rounded-2xl text-center border border-border hover:border-gold transition-colors">
                            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold-strong">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-xl text-ink mb-2">Trusted Provider</h3>
                            <p className="text-ink-muted mb-4 text-sm">Umrah Operations</p>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-gold-strong">
                                <CheckCircle size={16} /> Verified Experience
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
