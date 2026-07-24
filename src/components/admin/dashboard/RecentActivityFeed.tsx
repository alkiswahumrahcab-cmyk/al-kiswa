import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface RecentActivityFeedProps {
    logs: { id: string; action: string; details: string; timestamp: Date; user: string }[];
}

export default function RecentActivityFeed({ logs }: RecentActivityFeedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-border rounded-xl p-6 shadow-sm"
        >
            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
                <Activity size={18} className="text-muted" />
                Live Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-border">
                {logs.map((log, index) => (
                    <div key={log.id || index} className="relative pl-10">
                        <div className={`
                            absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-surface flex items-center justify-center z-10
                            ${log.action.includes('DELETE') ? 'bg-error-soft text-error' :
                                log.action.includes('UPDATE') ? 'bg-info/10 text-info' :
                                    'bg-success-soft text-success'}
                        `}>
                            <Activity size={16} />
                        </div>
                        <div className="bg-surface-alt rounded-xl p-3 border border-border hover:border-border-strong transition-colors">
                            <p className="text-sm font-semibold text-ink">
                                {log.action.replace(/_/g, ' ')}
                            </p>
                            <p className="text-xs text-muted mt-1 line-clamp-2">
                                {log.details}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-[10px] text-muted font-mono uppercase tracking-wider">
                                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span>•</span>
                                <span className="text-muted">{log.user}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-center py-8 text-muted text-sm pl-10">
                        No recent activity
                    </div>
                )}
            </div>
        </motion.div>
    );
}
