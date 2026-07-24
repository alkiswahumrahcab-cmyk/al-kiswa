'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Globe, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Video, Search, Code, Layout, AtSign, Hash, FileText, Link as LinkIcon, Lock, ShieldCheck, Percent, Mail, DatabaseBackup, Trash2, Banknote } from 'lucide-react';
import styles from '../admin.module.css';
import { Toast, ToastType } from '@/components/ui/Toast';
import dynamic from 'next/dynamic';

const PasswordConfirmModal = dynamic(() => import('@/components/admin/PasswordConfirmModal'), { ssr: false });

import DiscountManagement from '@/components/admin/settings/DiscountManagement';
import EmailTemplateManager from '@/components/admin/settings/EmailTemplateManager';
import { Settings } from '@/lib/validations';
import { DEFAULT_BOOKING_CONFIRMATION_TEMPLATE, DEFAULT_ADMIN_NOTIFICATION_TEMPLATE } from '@/lib/email-templates';

type Tab = 'general' | 'contact' | 'social' | 'seo' | 'scripts' | 'security' | 'discount' | 'emails' | 'database' | 'currency' | 'fees';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('general');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
        message: '',
        type: 'success',
        isVisible: false
    });

    // Security Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [retentionMonths, setRetentionMonths] = useState('6');
    type PendingSaveType = 'GLOBAL' | 'SECTION' | null;
    const [pendingAction, setPendingAction] = useState<PendingSaveType>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pendingSectionData, setPendingSectionData] = useState<{ section: keyof Settings; data: any } | null>(null);

    const [settings, setSettings] = useState({
        site_name: '',
        site_description: '',
        contact_phone: '',
        contact_phone_2: '',
        contact_email: '',
        address: '',
        social_facebook: '',
        social_instagram: '',
        social_twitter: '',
        social_linkedin: '',
        social_tiktok: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',

        scripts_header: '',
        scripts_footer: '',
        google_analytics_id: '',

        discount: {
            enabled: false,
            type: 'percentage',
            value: 0,
            startDate: '',
            endDate: '',
        },
        emailTemplates: {
            bookingConfirmation: '',
            adminNotification: '',
        },
        fees: {
            enableHajjTerminalFee: true,
            hajjTerminalFeeAmount: 90,
        },
        exchange_rate: '3.75'
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Password strength checks
    const pwChecks = {
        length: passwordForm.newPassword.length >= 8,
        upper: /[A-Z]/.test(passwordForm.newPassword),
        lower: /[a-z]/.test(passwordForm.newPassword),
        number: /[0-9]/.test(passwordForm.newPassword),
        special: /[^A-Za-z0-9]/.test(passwordForm.newPassword),
    };
    const pwStrong = Object.values(pwChecks).every(Boolean);

    const showToast = useCallback((message: string, type: ToastType) => {
        setToast({ message, type, isVisible: true });
    }, []);

    const fetchSettings = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();

            // Reconstruct discount object from flat keys
            const discountSettings = {
                enabled: data.discount_enabled === 'true',
                type: data.discount_type || 'percentage',
                value: Number(data.discount_value) || 0,
                startDate: data.discount_start_date || '',
                endDate: data.discount_end_date || '',
            };

            const emailTemplates = {
                bookingConfirmation: data.email_template_booking_confirmation || DEFAULT_BOOKING_CONFIRMATION_TEMPLATE,
                adminNotification: data.email_template_admin_notification || DEFAULT_ADMIN_NOTIFICATION_TEMPLATE,
            };

            const feesSettings = {
                enableHajjTerminalFee: data.fees_enable_hajj_terminal !== 'false', // default true
                hajjTerminalFeeAmount: Number(data.fees_hajj_terminal_amount) || 90,
            };

            setSettings(prev => ({
                ...prev,
                ...data,
                discount: discountSettings,
                emailTemplates: emailTemplates,
                fees: feesSettings
            }));
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            showToast('Failed to load settings', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPendingAction('GLOBAL');
        setIsPasswordModalOpen(true);
    };

    const handleFinalSubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                showToast('Settings saved successfully!', 'success');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            showToast('Error saving settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSectionSave = async (section: keyof Settings, data: any) => {
        setPendingAction('SECTION');
        setPendingSectionData({ section, data });
        setIsPasswordModalOpen(true);
    };

    const handleFinalSectionSave = async () => {
        if (!pendingSectionData) return;
        const { section, data } = pendingSectionData;

        setSaving(true);
        try {
            setSettings(prev => ({ ...prev, [section]: data }));

            const updatedSettings = { ...settings, [section]: data };

            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSettings),
            });

            if (res.ok) {
                showToast('Settings saved successfully!', 'success');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            showToast('Error saving settings', 'error');
        } finally {
            setSaving(false);
            setPendingSectionData(null);
        }
    };

    const handleConfirmPassword = () => {
        setIsPasswordModalOpen(false);
        if (pendingAction === 'GLOBAL') {
            handleFinalSubmit();
        } else if (pendingAction === 'SECTION') {
            handleFinalSectionSave();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!pwStrong) {
            showToast('Password does not meet strength requirements', 'error');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }

        setPasswordLoading(true);
        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword
                }),
            });

            const data = await res.json();

            if (res.ok) {
                showToast('Password changed successfully', 'success');
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                showToast(data.error || 'Failed to change password', 'error');
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            showToast('An error occurred', 'error');
        } finally {
            setPasswordLoading(false);
        }
    };



    const tabs = [
        { id: 'general', label: 'General', icon: Layout, description: 'Site identity and basics' },
        { id: 'contact', label: 'Contact', icon: Phone, description: 'Address and phones' },
        { id: 'social', label: 'Social Media', icon: Globe, description: 'Social network links' },
        { id: 'seo', label: 'SEO', icon: Search, description: 'Search engine optimization' },
        { id: 'scripts', label: 'Scripts', icon: Code, description: 'Custom tracking scripts' },
        { id: 'discount', label: 'Discounts', icon: Percent, description: 'Promotions & offers' },
        { id: 'currency', label: 'Pricing & Currency', icon: Banknote, description: 'Manage exchange rate' },
        { id: 'fees', label: 'Fees & Surcharges', icon: Percent, description: 'Terminal fees' },
        { id: 'emails', label: 'Email Templates', icon: Mail, description: 'Customize emails' },
        { id: 'database', label: 'Maintenance', icon: DatabaseBackup, description: 'Data retention & cleanup' },
        { id: 'security', label: 'Security', icon: ShieldCheck, description: 'Password & access' },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
        </div>
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className={styles.title}>Settings</h1>
                    <p className="text-muted">Manage your website configuration and preferences</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-btn font-bold shadow-lg shadow-gold/20 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                {/* Sidebar Navigation */}
                <div className="flex flex-col gap-2 sticky top-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-left border ${isActive
                                    ? 'bg-surface shadow-md border-gold/20'
                                    : 'hover:bg-surface-alt border-transparent hover:border-border'
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-gold text-white shadow-lg shadow-gold/30' : 'bg-surface-sunken text-muted group-hover:bg-surface group-hover:text-gold'}`}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <div className={`font-semibold ${isActive ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>
                                        {tab.label}
                                    </div>
                                    <div className="text-xs text-muted font-medium">
                                        {tab.description}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={styles.glassCard}
                        >
                            {activeTab === 'general' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Layout className="text-gold" size={28} />
                                            General Information
                                        </h2>
                                        <p className="text-muted">Basic details about your website identity.</p>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Site Name</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="site_name"
                                                    value={settings.site_name}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="Al Kiswah Umrah Transport"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Site Description</label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-4 text-muted" size={18} />
                                                <textarea
                                                    name="site_description"
                                                    value={settings.site_description}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none min-h-[120px]"
                                                    placeholder="Brief description of your services..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Phone className="text-gold" size={28} />
                                            Contact Details
                                        </h2>
                                        <p className="text-muted">How customers can reach you.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="contact_phone"
                                                    value={settings.contact_phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="+966 50 123 4567"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Secondary Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="contact_phone_2"
                                                    value={settings.contact_phone_2}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="+966 50 987 6543"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Email Address</label>
                                            <div className="relative">
                                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="email"
                                                    name="contact_email"
                                                    value={settings.contact_email}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="info@alkiswah.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={settings.address}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="Makkah, Saudi Arabia"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'social' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Globe className="text-gold" size={28} />
                                            Social Media
                                        </h2>
                                        <p className="text-muted">Connect your social platforms.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { name: 'social_facebook', label: 'Facebook', icon: Facebook, color: 'text-info' },
                                            { name: 'social_instagram', label: 'Instagram', icon: Instagram, color: 'text-error' },
                                            { name: 'social_twitter', label: 'Twitter / X', icon: Twitter, color: 'text-info' },
                                            { name: 'social_linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-info' },
                                            { name: 'social_tiktok', label: 'TikTok', icon: Video, color: 'text-ink' },
                                        ].map((social) => (
                                            <div key={social.name} className="space-y-2">
                                                <label className="text-sm font-semibold text-ink ml-1 flex items-center gap-2">
                                                    <social.icon size={16} className={social.color} /> {social.label}
                                                </label>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                                                    <input
                                                        type="text"
                                                        name={social.name}
                                                        value={settings[social.name as keyof typeof settings] as string}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                        placeholder={`https://${social.label.toLowerCase().split(' ')[0]}.com/...`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Search className="text-gold" size={28} />
                                            SEO Configuration
                                        </h2>
                                        <p className="text-muted">Optimize your site for search engines.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Meta Title</label>
                                            <div className="relative">
                                                <Layout className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="seo_title"
                                                    value={settings.seo_title}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="Al Kiswah Umrah Transport - Premium Taxi Service"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Recommended length: 50-60 characters</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Meta Description</label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-4 text-muted" size={18} />
                                                <textarea
                                                    name="seo_description"
                                                    value={settings.seo_description}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none min-h-[100px]"
                                                    placeholder="Best Umrah taxi service in Saudi Arabia..."
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Recommended length: 150-160 characters</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Keywords</label>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="seo_keywords"
                                                    value={settings.seo_keywords}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="umrah taxi, makkah transport, jeddah airport taxi"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Separate keywords with commas</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'scripts' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Code className="text-gold" size={28} />
                                            Custom Scripts
                                        </h2>
                                        <p className="text-muted">Inject custom code into your site.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Google Analytics Measurement ID</label>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="text"
                                                    name="google_analytics_id"
                                                    value={settings.google_analytics_id}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="G-XXXXXXXXXX"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Enter your GA4 Measurement ID (starts with G-)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Header Scripts</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-4 text-muted font-mono text-xs">&lt;/&gt;</div>
                                                <textarea
                                                    name="scripts_header"
                                                    value={settings.scripts_header}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none font-mono text-sm min-h-[200px]"
                                                    placeholder="<!-- Google Analytics -->"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Scripts injected into the &lt;head&gt; tag</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Footer Scripts</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-4 text-muted font-mono text-xs">&lt;/&gt;</div>
                                                <textarea
                                                    name="scripts_footer"
                                                    value={settings.scripts_footer}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none font-mono text-sm min-h-[200px]"
                                                    placeholder="<!-- Chat Widget -->"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Scripts injected before the closing &lt;/body&gt; tag</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'discount' && (
                                <DiscountManagement
                                    settings={settings as unknown as Settings}
                                    onSave={handleSectionSave}
                                    isSaving={saving}
                                />
                            )}

                            {activeTab === 'currency' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <Banknote className="text-gold" size={28} />
                                            Pricing & Currency
                                        </h2>
                                        <p className="text-muted">Manage the global USD to SAR exchange rate.</p>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-ink ml-1">Exchange Rate (1 USD to SAR)</label>
                                            <div className="relative">
                                                <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="exchange_rate"
                                                    value={settings.exchange_rate}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-btn border border-border bg-surface-sunken text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="3.75"
                                                />
                                            </div>
                                            <p className="text-xs text-muted ml-1">Example: 3.75 means 1 USD = 3.75 SAR</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'fees' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className={styles.glassCard}>
                                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-ink">
                                            <Percent className="text-success" />
                                            Additional Fees & Surcharges
                                        </h2>
                                        
                                        <div className="space-y-6">
                                        {/* Hajj Terminal Fee */}
                                        <div className="bg-surface-sunken rounded-2xl p-6 border border-border">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <div className="p-2 bg-success/10 text-success rounded-btn">
                                                            <MapPin size={20} />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-ink">Jeddah Airport Hajj Terminal Parking Fee</h3>
                                                    </div>
                                                    <p className="text-sm text-muted">Apply a mandatory parking fee when customers select Hajj Terminal for Jeddah Airport pickups.</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.fees.enableHajjTerminalFee}
                                                        onChange={(e) => setSettings(s => ({ ...s, fees: { ...s.fees, enableHajjTerminalFee: e.target.checked } }))}
                                                    />
                                                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                                                    </label>
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-sm font-bold text-ink mb-2">
                                                        Parking Fee Amount (SAR)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={settings.fees.hajjTerminalFeeAmount}
                                                        onChange={(e) => setSettings(s => ({ ...s, fees: { ...s.fees, hajjTerminalFeeAmount: Number(e.target.value) } }))}
                                                        className="w-full px-4 py-3 rounded-btn border border-border bg-surface text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                        disabled={!settings.fees.enableHajjTerminalFee}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSectionSave('fees', settings.fees)}
                                                        className="px-4 py-2 bg-ink text-surface rounded-btn hover:bg-ink/90 transition-all hover:scale-105 flex items-center gap-2 text-sm font-medium"
                                                    >
                                                        <Save size={16} /> Save Fee Settings
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'emails' && (
                                <EmailTemplateManager
                                    settings={settings as unknown as Settings}
                                    onChange={handleSectionSave}
                                />
                            )}

                            {activeTab === 'database' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <DatabaseBackup className="text-gold" size={28} />
                                            Database Maintenance
                                        </h2>
                                        <p className="text-muted">Manage your data retention and keep your system optimized.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-surface-sunken p-6 rounded-2xl border border-error/20 flex flex-col md:flex-row gap-6">
                                            <div className="p-3 bg-error/10 text-error rounded-xl h-fit shrink-0">
                                                <Trash2 size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-ink mb-2">Clean Up Old Data</h3>
                                                <p className="text-muted mb-4 text-sm leading-relaxed">
                                                    Permanently remove <strong>Completed</strong> and <strong>Cancelled</strong> bookings that are older than the selected period.
                                                    This action removes booking records and their associated driver assignments.
                                                    <br /><span className="font-semibold text-error">Warning: This action cannot be undone.</span>
                                                </p>

                                                <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                                                    <div className="w-full sm:w-48">
                                                        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 block">Delete Older Than</label>
                                                        <select
                                                            value={retentionMonths}
                                                            onChange={(e) => setRetentionMonths(e.target.value)}
                                                            className="w-full p-2.5 rounded-btn border border-border bg-surface focus:ring-2 focus:ring-error/20 focus:border-error outline-none font-medium cursor-pointer"
                                                        >
                                                            <option value="1">1 Month</option>
                                                            <option value="3">3 Months</option>
                                                            <option value="6">6 Months</option>
                                                            <option value="12">1 Year</option>
                                                            <option value="24">2 Years</option>
                                                        </select>
                                                    </div>
                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm(`Are you SURE you want to delete all completed/cancelled bookings older than ${retentionMonths} months? This is irreversible.`)) return;

                                                            setLoading(true);
                                                            try {
                                                                const res = await fetch(`/api/admin/maintenance/cleanup?months=${retentionMonths}`, { method: 'DELETE' });
                                                                const data = await res.json();
                                                                if (res.ok) {
                                                                    showToast(data.message, 'success');
                                                                } else {
                                                                    showToast(data.error || 'Cleanup failed', 'error');
                                                                }
                                                            } catch (err) {
                                                                showToast('Network error during cleanup', 'error');
                                                            } finally {
                                                                setLoading(false);
                                                            }
                                                        }}
                                                        className="px-6 py-2.5 bg-error hover:bg-error/90 text-white rounded-btn font-bold shadow-lg shadow-error/20 transition-all hover:scale-105 active:scale-95"
                                                    >
                                                        Clean Up Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-ink">
                                            <ShieldCheck className="text-gold" size={28} />
                                            Security Settings
                                        </h2>
                                        <p className="text-muted">Manage your account security and password.</p>
                                    </div>

                                    <div className="bg-surface-sunken p-6 rounded-2xl border border-border">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-ink">
                                            <Lock size={20} className="text-muted" />
                                            Change Password
                                        </h3>
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-ink ml-1">Current Password</label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={passwordForm.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-btn border border-border bg-surface text-ink focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all outline-none"
                                                    placeholder="Enter current password"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-ink ml-1">New Password</label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={passwordForm.newPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                    className={`w-full px-4 py-3 rounded-btn border bg-surface text-ink focus:ring-2 focus:ring-gold/20 transition-all outline-none ${
                                                        passwordForm.newPassword
                                                            ? pwStrong ? 'border-success focus:border-success' : 'border-error focus:border-error'
                                                            : 'border-border focus:border-gold'
                                                    }`}
                                                    placeholder="Enter new password"
                                                />
                                                {/* Live strength checklist */}
                                                {passwordForm.newPassword && (
                                                    <ul className="mt-2 space-y-1 text-xs">
                                                        {([
                                                            [pwChecks.length,  '8+ characters'],
                                                            [pwChecks.upper,   'Uppercase letter (A-Z)'],
                                                            [pwChecks.lower,   'Lowercase letter (a-z)'],
                                                            [pwChecks.number,  'Number (0-9)'],
                                                            [pwChecks.special, 'Special character (@, !, # …)'],
                                                        ] as [boolean, string][]).map(([ok, label]) => (
                                                            <li key={label} className={`flex items-center gap-1.5 ${ok ? 'text-success' : 'text-error'}`}>
                                                                <span className="text-base leading-none">{ok ? '✓' : '✗'}</span> {label}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-ink ml-1">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={passwordForm.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                    className={`w-full px-4 py-3 rounded-btn border bg-surface text-ink focus:ring-2 focus:ring-gold/20 transition-all outline-none ${
                                                        passwordForm.confirmPassword
                                                            ? passwordForm.newPassword === passwordForm.confirmPassword ? 'border-success' : 'border-error'
                                                            : 'border-border focus:border-gold'
                                                    }`}
                                                    placeholder="Confirm new password"
                                                />
                                                {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                                                    <p className="text-xs text-error mt-1">Passwords do not match</p>
                                                )}
                                            </div>
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={passwordLoading || !pwStrong || passwordForm.newPassword !== passwordForm.confirmPassword}
                                                    className="px-6 py-2.5 bg-ink text-surface rounded-btn font-medium hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                                >
                                                    {passwordLoading ? 'Updating...' : 'Update Password'}
                                                </button>
                                                {passwordForm.newPassword && !pwStrong && (
                                                    <p className="text-xs text-gold mt-2">⚠ Password does not meet all requirements above</p>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <PasswordConfirmModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={handleConfirmPassword}
                title="Confirm Changes"
                description="Please enter your admin password to save these settings."
                actionLabel="Save Changes"
            />
        </div>
    );
}
