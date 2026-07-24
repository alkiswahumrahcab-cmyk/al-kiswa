'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Car, DollarSign, Settings, LogOut, MapPin, MessageSquare, FileText, Users, Image as ImageIcon, PenTool, UserCheck, Navigation, BarChart3, Menu, X, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { logout } from '@/lib/auth';

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
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        // Close sidebar on route change (mobile)
        setIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        const checkAuth = async () => {
            if (pathname === '/292852/login') {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();

                if (data.authenticated) {
                    setUser(data.user);
                } else {
                    router.push('/292852/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/292852/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // If on login page, render full screen without sidebar
    if (pathname === '/292852/login') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-bg gap-4">
                <div className="w-12 h-12 border-4 border-gold-soft border-t-gold rounded-full animate-spin"></div>
                <div className="text-muted font-medium animate-pulse">Verifying Session...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logout();
        router.push('/292852/login');
    };

    const allLinks = [
        { href: '/292852', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'manager'] },
        { href: '/292852/bookings', label: 'Bookings', icon: Calendar, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/inquiries', label: 'Inquiries', icon: Mail, roles: ['admin', 'manager'] },
        { href: '/292852/routes', label: 'Routes', icon: MapPin, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/fleet', label: 'Fleet', icon: Car, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/pricing', label: 'Pricing', icon: DollarSign, roles: ['admin'] },
        { href: '/292852/reviews', label: 'Reviews', icon: MessageSquare, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/blog', label: 'Blog', icon: FileText, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/gallery', label: 'Gallery', icon: ImageIcon, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/content', label: 'Content', icon: PenTool, roles: ['admin', 'manager', 'operational_manager'] },
        { href: '/292852/marketing', label: 'Marketing', icon: MessageSquare, roles: ['admin', 'manager'] },
        { href: '/292852/users', label: 'Users', icon: Users, roles: ['admin'] },
        { href: '/292852/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
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
        <div className="flex h-screen bg-bg font-body text-body overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface text-ink border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 rounded-md hover:bg-surface-alt transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>
                {user && (
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-ink font-bold text-sm">
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
                    fixed lg:static inset-y-0 left-0 z-50 bg-surface border-r border-border 
                    transform transition-all duration-300 ease-in-out lg:transform-none flex flex-col
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-border flex items-center justify-between relative">
                    {!isCollapsed && (
                        <div className="flex flex-col items-start overflow-hidden whitespace-nowrap transition-all">
                            <span className="text-2xl font-bold font-display text-ink">Al Kiswah</span>
                            <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase mt-1">Transport</span>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="flex items-center justify-center w-full">
                            <span className="text-2xl font-bold font-display text-gold">A</span>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`absolute -right-3 top-8 bg-surface border border-border rounded-full p-1 text-muted hover:text-ink hover:bg-surface-alt transition-colors hidden lg:flex z-50 shadow-sm`}
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    {!isCollapsed && <div className="px-3 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">Main Menu</div>}
                    {isCollapsed && <div className="h-6"></div>}
                    {visibleLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                title={isCollapsed ? link.label : undefined}
                                className={`
                                    flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-gold-soft text-gold ring-1 ring-gold-line'
                                        : 'text-muted hover:text-ink hover:bg-surface-alt'
                                    }
                                `}
                            >
                                <Icon size={18} className={isActive ? 'text-gold' : 'text-muted group-hover:text-ink shrink-0'} />
                                {!isCollapsed && <span className="whitespace-nowrap">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-border bg-surface">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} mb-3`}>
                        <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-ink font-bold shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                                <p className="text-xs text-muted truncate">{getRoleDisplay(user.role)}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={handleLogout}
                            title={isCollapsed ? "Logout" : undefined}
                            className={`p-2 text-muted hover:text-error hover:bg-error-soft rounded-lg transition-colors flex-1 flex items-center justify-center ${isCollapsed ? 'px-0' : 'gap-2'} text-xs font-medium`}
                        >
                            <LogOut size={16} className="shrink-0" />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full pt-16 lg:pt-0 pb-6 px-4 lg:px-8 custom-scrollbar">
                {children}
            </main>
        </div>
    );
}
