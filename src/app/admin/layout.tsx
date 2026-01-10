'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Car, DollarSign, Settings, LogOut, MapPin, MessageSquare, FileText, Users, Image as ImageIcon, PenTool, UserCheck, Navigation, BarChart3, Menu, X } from 'lucide-react';
import { logout } from '@/lib/auth';
import AdminThemeToggle from './AdminThemeToggle';
import AdminAutoLock from '@/components/admin/AdminAutoLock';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'operational_manager';
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Close sidebar on route change (mobile)
        setIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        const checkAuth = async () => {
            if (pathname === '/admin/login') {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();

                if (data.authenticated) {
                    setUser(data.user);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // If on login page, render full screen without sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 gap-4">
                <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
                <div className="text-slate-500 font-medium animate-pulse">Verifying Session...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logout();
        router.push('/admin/login');
    };

    const allLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'manager'] },
        { href: '/admin/bookings', label: 'Bookings', icon: Calendar, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/routes', label: 'Routes', icon: MapPin, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/fleet', label: 'Fleet', icon: Car, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/pricing', label: 'Pricing', icon: DollarSign, roles: ['admin'] },
        { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/blog', label: 'Blog', icon: FileText, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/content', label: 'Content', icon: PenTool, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/admin/marketing', label: 'Marketing', icon: MessageSquare, roles: ['admin', 'manager'] },
        { href: '/admin/users', label: 'Users', icon: Users, roles: ['admin'] },
        { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
    ];

    const userRole = user.role.toLowerCase();
    const visibleLinks = allLinks.filter(link => link.roles.includes(userRole));

    const getRoleDisplay = (role: string) => {
        switch (role) {
            case 'admin': return 'Boss Admin';
            case 'manager': return 'Manager';
            case 'operational_manager': return 'Operational Manager';
            default: return role;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 rounded-md hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>
                {user && (
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 
                    transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex flex-col items-start">
                        <span className="text-2xl font-bold text-white">Al Kiswah</span>
                        <span className="text-xs font-bold text-amber-500 tracking-[0.2em] uppercase">Transport</span>
                        <span className="text-sm text-slate-400 mt-1 font-arabic">الكسوة لنقل المعتمرين</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</div>
                    {visibleLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                                    }
                                `}
                            >
                                <Icon size={18} className={isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300'} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{getRoleDisplay(user.role)}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <AdminThemeToggle />
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-1 flex items-center justify-center gap-2 text-xs font-medium"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full pt-16 lg:pt-0 pb-6 px-4 lg:px-8 custom-scrollbar">
                {children}
            </main>

            <AdminAutoLock />
        </div>
    );
}
