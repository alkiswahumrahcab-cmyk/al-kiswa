import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface StatusDistributionChartProps {
    data: { name: string; value: number; color: string }[];
}

export default function StatusDistributionChart({ data }: StatusDistributionChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-black/50"
        >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={18} className="text-purple-400" />
                Booking Status
            </h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111',
                                borderColor: '#333',
                                borderRadius: '8px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
