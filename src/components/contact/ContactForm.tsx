'use client';

import { useState } from 'react';
import GlassButton from '@/components/ui/GlassButton';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [emailError, setEmailError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEmailError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        // Strict Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address (e.g., user@example.com)');
            return;
        }

        setStatus('submitting');
        const data = {
            name: formData.get('name'),
            email: email,
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-muted flex items-center justify-between" htmlFor="name">
                    <span>Full Name</span>
                    <span className="text-xs text-gold-strong font-arabic">الاسم الكامل</span>
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold h-5 w-5" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-surface border border-border-strong rounded-[12px] pl-10 pr-4 h-12 focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-muted text-ink"
                        placeholder="e.g. Abdullah Ahmed"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-muted flex items-center justify-between" htmlFor="email">
                    <span>Email Address</span>
                    <span className="text-xs text-gold-strong font-arabic">البريد الإلكتروني</span>
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold h-5 w-5" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full bg-surface border rounded-[12px] pl-10 pr-4 h-12 outline-none transition-all placeholder:text-muted text-ink ${emailError ? 'border-error focus:ring-error/50' : 'border-border-strong focus:ring-1 focus:ring-gold focus:border-gold'}`}
                        placeholder="your@email.com"
                        required
                        onChange={() => setEmailError('')}
                    />
                </div>
                {emailError && <p className="text-error text-xs mt-1 animate-pulse">{emailError}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-muted flex items-center justify-between" htmlFor="message">
                    <span>Message</span>
                    <span className="text-xs text-gold-strong font-arabic">الرسالة</span>
                </label>
                <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gold h-5 w-5" />
                    <textarea
                        id="message"
                        name="message"
                        className="w-full bg-surface border border-border-strong rounded-[12px] pl-10 pr-4 py-3 h-32 resize-none focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-muted text-ink"
                        placeholder="How can we help you? (كيف يمكننا مساعدتك؟)"
                        required
                    ></textarea>
                </div>
            </div>

            <button
                type="submit"
                className="w-full btn-primary !rounded-xl relative overflow-hidden group flex items-center justify-center gap-2"
                disabled={status === 'submitting'}
            >
                <div className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'submitting' ? (
                        <>
                            <span className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></span>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            <span>Send Message (ارسال)</span>
                        </>
                    )}
                </div>
            </button>

            {status === 'success' && (
                <div className="p-4 bg-success-soft border border-success/20 rounded-xl text-success text-center text-sm animate-in fade-in slide-in-from-bottom-2">
                    Message sent successfully! We will contact you soon.
                    <br />
                    <span className="font-arabic text-xs opacity-75">تم الإرسال بنجاح! سنتواصل معك قريباً.</span>
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 bg-error-soft border border-error/20 rounded-xl text-error text-center text-sm animate-in fade-in slide-in-from-bottom-2">
                    Failed to send message. Please try again.
                    <br />
                    <span className="font-arabic text-xs opacity-75">فشل الإرسال. يرجى المحاولة مرة أخرى.</span>
                </div>
            )}
        </form>
    );
}
