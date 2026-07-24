'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Edit, Plus, Search } from 'lucide-react';

interface Section {
    _id: string;
    name: string;
    page: string;
    type: string;
    title: string;
    updatedAt: string;
}

export default function ContentManagementPage() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const res = await fetch('/api/sections');
            if (res.ok) {
                const data = await res.json();
                setSections(data);
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSections = sections.filter(section =>
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedSections = filteredSections.reduce((acc, section) => {
        const page = section.page || 'Other';
        if (!acc[page]) acc[page] = [];
        acc[page].push(section);
        return acc;
    }, {} as Record<string, Section[]>);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-ink">Content Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (confirm('This will seed default sections if they don\'t exist. Continue?')) {
                                fetch('/api/sections/seed', { method: 'POST' })
                                    .then(res => res.json())
                                    .then(data => {
                                        alert(data.message);
                                        fetchSections();
                                    });
                            }
                        }}
                        className="bg-success text-white px-4 py-2 rounded-btn flex items-center gap-2 shadow-sm transition-transform hover:scale-105 font-bold"
                    >
                        <Plus size={20} />
                        Seed Defaults
                    </button>
                </div>
            </div>

            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden mb-6">
                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search sections..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink placeholder:text-muted focus:ring-2 focus:ring-gold/50 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-muted">Loading sections...</div>
            ) : Object.keys(groupedSections).length === 0 ? (
                <div className="text-center py-12 text-muted">No sections found. Try seeding defaults.</div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedSections).map(([page, pageSections]) => (
                        <div key={page} className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
                            <div className="px-6 py-4 bg-surface-sunken border-b border-border">
                                <h2 className="text-lg font-semibold text-ink">{page} Page</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-sunken text-ink">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wider">Section Name</th>
                                            <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {pageSections.map((section) => (
                                            <tr key={section._id} className="hover:bg-surface-alt transition-colors">
                                                <td className="px-6 py-4 text-ink font-medium">
                                                    {section.name}
                                                </td>
                                                <td className="px-6 py-4 text-ink text-sm capitalize">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium bg-info/10 text-info">
                                                        {section.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-ink">
                                                    {section.title}
                                                </td>
                                                <td className="px-6 py-4 text-muted text-sm">
                                                    {new Date(section.updatedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/admin/content/${section._id}`}
                                                        className="inline-flex items-center gap-1 text-info hover:text-info/80 font-medium transition-colors"
                                                    >
                                                        <Edit size={16} />
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
