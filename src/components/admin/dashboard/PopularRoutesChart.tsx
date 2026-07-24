import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PopularRoutesChartProps {
    data: { name: string; value: number }[];
}

export default function PopularRoutesChart({ data }: PopularRoutesChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-surface border border-border rounded-xl p-6 shadow-sm"
        >
            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-gold" />
                Popular Routes
            </h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fill: 'var(--color-muted)' }} interval={0} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                            formatter={(value: any) => [value, 'Bookings']}
                        />
                        <Bar dataKey="value" fill="var(--color-gold)" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
