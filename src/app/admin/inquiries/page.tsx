'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, User, Search, CheckCircle, Clock } from 'lucide-react';
import adminStyles from '../admin.module.css';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await fetch('/api/contact');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setInquiries(data);
                }
            } catch (error) {
                console.error('Failed to load inquiries', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInquiries();
    }, []);

    const filteredInquiries = inquiries.filter(inq => {
        if (filter === 'all') return true;
        return inq.status === filter;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className={adminStyles.title}>Inquiries</h1>
                <p className="text-muted mt-1">Manage incoming messages from the contact form.</p>
            </div>

            <div className="flex gap-2 mb-6">
                {['all', 'new', 'read', 'replied'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-btn text-sm font-medium capitalize transition-all ${filter === f ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'bg-surface-sunken text-muted hover:bg-surface-alt hover:text-ink'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className={adminStyles.glassCard}>
                <div className="overflow-x-auto">
                    <table className={adminStyles.table}>
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-muted">
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inq) => (
                                    <tr key={inq._id} className="hover:bg-surface-alt transition-colors border-b border-border last:border-0">
                                        <td className="align-top py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-ink">{inq.name}</span>
                                                <span className="text-xs text-muted flex items-center gap-1 mt-1">
                                                    <Mail size={10} /> {inq.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="max-w-md py-4">
                                            <p className="text-sm text-muted line-clamp-2">{inq.message}</p>
                                        </td>
                                        <td className="align-top whitespace-nowrap py-4">
                                            <div className="flex items-center gap-1 text-xs text-muted">
                                                <Calendar size={12} />
                                                {new Date(inq.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="align-top py-4">
                                            <span className={`px-2 py-1 rounded-pill text-xs font-bold uppercase ${inq.status === 'new' ? 'bg-gold/10 text-gold' :
                                                    inq.status === 'replied' ? 'bg-success/10 text-success' :
                                                        'bg-surface-sunken text-muted'
                                                }`}>
                                                {inq.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
