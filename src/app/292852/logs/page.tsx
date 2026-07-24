'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Search, ChevronLeft, ChevronRight, Activity, Filter, RefreshCcw } from 'lucide-react';
import adminStyles from '../admin.module.css';

interface LogEntry {
    id: string;
    action: string;
    details: string;
    timestamp: string;
    user: string;
    entity?: string;
}

interface LogsResponse {
    logs: LogEntry[];
    total: number;
    pages: number;
}

function LogsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search: searchTerm
            });
            const res = await fetch(`/api/logs?${params}`);
            if (res.ok) {
                const data: LogsResponse = await res.json();
                setLogs(data.logs);
                setTotal(data.total);
                setTotalPages(data.pages);
            }
        } catch (error) {
            console.error('Failed to fetch logs', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set('search', searchTerm);
            } else {
                params.delete('search');
            }
            params.set('page', '1'); // Reset to page 1 on search
            router.push(`/292852/logs?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    // Fetch on page/url change
    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchParams]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/292852/logs?${params.toString()}`);
    };

    const getActionColor = (action: string) => {
        if (action.includes('DELETE')) return 'bg-red-500/10 text-red-500 border-red-500/20';
        if (action.includes('UPDATE') || action.includes('EDIT')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        if (action.includes('CREATE') || action.includes('ADD')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        return 'bg-surface-sunken text-muted border-border';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className={adminStyles.title}>Activity Logs</h1>
                    <p className="text-muted mt-1">Audit trail of all system actions</p>
                </div>
                <button
                    onClick={fetchLogs}
                    className="p-2 bg-surface-sunken rounded-btn hover:bg-surface transition-colors border border-border"
                    title="Refresh Logs"
                >
                    <RefreshCcw size={18} className={loading ? 'animate-spin text-gold' : 'text-ink'} />
                </button>
            </div>

            <div className={adminStyles.glassCard}>
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-border">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-info/10 text-info rounded-xl">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-muted">Total Events</p>
                            <p className="text-2xl font-bold text-ink">{total}</p>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 flex flex-col md:flex-row gap-4 border-b border-border bg-surface-alt">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search by action, user, or details..."
                            className="w-full pl-10 pr-4 py-2 rounded-btn border border-border bg-surface focus:ring-2 focus:ring-gold/20 outline-none transition-all text-ink"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className={adminStyles.table}>
                        <thead>
                            <tr>
                                <th className="w-[200px]">Timestamp</th>
                                <th className="w-[150px]">User</th>
                                <th className="w-[150px]">Action</th>
                                <th>Details</th>
                                <th className="w-[100px]">Entity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && logs.length === 0 ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td><div className="h-4 bg-border rounded w-24"></div></td>
                                        <td><div className="h-4 bg-border rounded w-20"></div></td>
                                        <td><div className="h-6 bg-border rounded w-24"></div></td>
                                        <td><div className="h-4 bg-border rounded w-48"></div></td>
                                        <td><div className="h-4 bg-border rounded w-16"></div></td>
                                    </tr>
                                ))
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-muted">
                                        No logs found matching criteria
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="group hover:bg-surface-alt transition-colors">
                                        <td className="text-sm text-muted font-mono">
                                            {format(new Date(log.timestamp), 'MMM d, HH:mm:ss')}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-surface-sunken border border-border flex items-center justify-center text-xs font-bold text-ink">
                                                    {log.user.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-sm text-ink">{log.user}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getActionColor(log.action)}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="text-sm text-ink max-w-md truncate" title={log.details}>
                                            {log.details}
                                        </td>
                                        <td>
                                            {log.entity && (
                                                <span className="text-xs font-mono bg-surface-sunken px-2 py-1 rounded text-muted">
                                                    {log.entity}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex items-center justify-between bg-surface-alt">
                    <span className="text-sm text-muted">
                        Page {page} of {totalPages || 1}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className="p-2 rounded-btn border border-border bg-surface hover:bg-surface-sunken disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                            className="p-2 rounded-btn border border-border bg-surface hover:bg-surface-sunken disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LogsPage() {
    return (
        <Suspense fallback={<div className="p-6">Loading logs...</div>}>
            <LogsContent />
        </Suspense>
    );
}
