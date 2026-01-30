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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className={adminStyles.title}>Inquiries</h1>
                <p className="text-slate-500 mt-1">Manage incoming messages from the contact form.</p>
            </div>

            <div className="flex gap-2 mb-6">
                {['all', 'new', 'read', 'replied'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
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
                                    <td colSpan={4} className="text-center py-12 text-slate-400">
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inq) => (
                                    <tr key={inq._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="align-top">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{inq.name}</span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Mail size={10} /> {inq.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="max-w-md">
                                            <p className="text-sm text-slate-600 line-clamp-2">{inq.message}</p>
                                        </td>
                                        <td className="align-top whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Calendar size={12} />
                                                {new Date(inq.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="align-top">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${inq.status === 'new' ? 'bg-amber-100 text-amber-600' :
                                                    inq.status === 'replied' ? 'bg-emerald-100 text-emerald-600' :
                                                        'bg-slate-100 text-slate-500'
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
