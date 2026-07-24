'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Image as ImageIcon, Eye, Edit2, CheckCircle, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PasswordConfirmModal from '@/components/admin/PasswordConfirmModal';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface BlogPostFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    isEditing?: boolean;
}

const CATEGORIES = ['Guide', 'Travel Tips', 'Experience', 'Value', 'Spiritual', 'News', 'FAQ'];

export default function BlogPostForm({ initialData, isEditing = false }: BlogPostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

    // Security Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        id: '', // Slug
        excerpt: '',
        content: '',
        category: 'Guide',
        image: '',
        author: '',
        tags: [] as string[],
        isPublished: true,
        metaTitle: '',
        metaDescription: '',
        alt: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: initialData.tags || [],
                isPublished: initialData.isPublished !== undefined ? initialData.isPublished : true,
                metaTitle: initialData.metaTitle || '',
                metaDescription: initialData.metaDescription || '',
                alt: initialData.alt || '',
            });
        }
    }, [initialData]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            id: !isEditing ? generateSlug(title) : prev.id
        }));
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // Step 1: Trigger Modal
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPasswordModalOpen(true);
    };

    // Step 2: Actually Save (Called after password verification)
    const handleFinalSubmit = async () => {
        // Modal closes automatically on success or we close it here
        setIsPasswordModalOpen(false);
        setLoading(true);

        try {
            const payload = {
                ...formData,
                readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`
            };

            const url = isEditing ? `/api/blog/${initialData.id}` : '/api/blog';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save post');

            router.push('/292852/blog');
            router.refresh();
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sticky top-0 bg-surface-sunken z-20 py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/292852/blog"
                            className="p-2 hover:bg-surface-alt rounded-btn transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-ink">
                                {isEditing ? 'Edit Post' : 'New Blog Post'}
                            </h1>
                            <div className="flex items-center gap-2 text-sm">
                                <span className={`w-2 h-2 rounded-full ${formData.isPublished ? 'bg-success' : 'bg-gold'}`} />
                                <span className="text-muted">
                                    {formData.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setPreviewMode(!previewMode)}
                            className="flex items-center gap-2 px-4 py-2 rounded-btn border border-border hover:bg-surface-alt transition-colors text-muted"
                        >
                            {previewMode ? <Edit2 size={18} /> : <Eye size={18} />}
                            <span>{previewMode ? 'Edit' : 'Preview'}</span>
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gold hover:bg-gold-strong text-white px-6 py-2 rounded-btn transition-colors font-medium disabled:opacity-50 shadow-lg shadow-gold/20"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            <span>{isEditing ? 'Update' : 'Publish'}</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-border">
                    <button
                        type="button"
                        onClick={() => setActiveTab('content')}
                        className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'content' ? 'border-b-2 border-gold text-gold-strong' : 'text-muted hover:text-ink'}`}
                    >
                        Content
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('seo')}
                        className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'seo' ? 'border-b-2 border-gold text-gold-strong' : 'text-muted hover:text-ink'}`}
                    >
                        SEO
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('settings')}
                        className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'border-b-2 border-gold text-gold-strong' : 'text-muted hover:text-ink'}`}
                    >
                        Settings
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {activeTab === 'content' && (
                            <>
                                {/* Title & Slug */}
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-muted p-0 text-ink"
                                            placeholder="Enter post title..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted font-mono bg-surface-sunken p-2 rounded">
                                        <span className="text-muted">/blog/</span>
                                        <input
                                            type="text"
                                            required
                                            value={formData.id}
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 w-full p-0 text-muted"
                                        />
                                    </div>
                                </div>

                                {/* Content Editor */}
                                <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden min-h-[500px] flex flex-col text-ink">
                                    {!previewMode ? (
                                        <div className="h-[500px]">
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.content}
                                                onChange={(content) => setFormData({ ...formData, content })}
                                                modules={modules}
                                                formats={formats}
                                                className="h-[450px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="prose max-w-none p-8">
                                            <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                                        </div>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                                    <label className="block text-sm font-medium text-ink mb-2">
                                        Excerpt
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="Short summary for cards and SEO..."
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'seo' && (
                            <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border space-y-6">
                                <h3 className="font-semibold text-ink">Search Engine Optimization</h3>

                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="Title tag for search engines"
                                    />
                                    <p className="text-xs text-muted mt-1">Recommended length: 50-60 characters</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-ink mb-1">
                                        Meta Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold"
                                        placeholder="Description for search results"
                                    />
                                    <p className="text-xs text-muted mt-1">Recommended length: 150-160 characters</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border space-y-6">
                                <h3 className="font-semibold text-ink">Post Settings</h3>
                                <p className="text-muted">Additional configuration options can go here.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                            <h3 className="font-semibold text-ink mb-4">Publishing</h3>
                            <div className="flex items-center justify-between p-3 bg-surface-sunken rounded-btn mb-4 border border-border">
                                <span className="text-sm font-medium text-ink">Status</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${formData.isPublished ? 'bg-success' : 'bg-surface-alt'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted">
                                {formData.isPublished ? (
                                    <><CheckCircle size={14} className="text-success" /> Visible to public</>
                                ) : (
                                    <><AlertCircle size={14} className="text-gold" /> Only visible to admins</>
                                )}
                            </div>
                        </div>

                        {/* Metadata Card */}
                        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border space-y-4">
                            <h3 className="font-semibold text-ink">Metadata</h3>

                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-ink mb-1">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gold-soft text-gold-strong text-xs font-medium">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-gold-strong/80"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                                    placeholder="Type and press Enter..."
                                />
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                            <h3 className="font-semibold text-ink mb-4">Featured Image</h3>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    // Attempt 1: Client-Side Upload (Preferred for large files)
                                                    // 1. Get signature
                                                    const signRes = await fetch('/api/upload?type=signature', { method: 'POST' });
                                                    const signData = await signRes.json();

                                                    if (!signData.success) {
                                                        throw new Error(signData.error || 'Failed to get upload signature');
                                                    }

                                                    // 2. Upload directly to Cloudinary
                                                    const formData = new FormData();
                                                    formData.append('file', file);
                                                    formData.append('api_key', signData.apiKey);
                                                    formData.append('timestamp', signData.timestamp.toString());
                                                    formData.append('signature', signData.signature);
                                                    formData.append('folder', signData.folder);

                                                    const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;

                                                    // DEBUG: Show exactly what is being sent
                                                    // alert(`DEBUG INFO:\nURL: ${uploadUrl}\nAPI Key: ${signData.apiKey}\nCloud Name: ${signData.cloudName}\nFile Name: ${file.name}`);

                                                    try {
                                                        const uploadRes = await fetch(uploadUrl, { method: 'POST', body: formData });
                                                        if (!uploadRes.ok) throw new Error('Network response was not ok');
                                                        const uploadData = await uploadRes.json();

                                                        if (uploadData.secure_url) {
                                                            setFormData(prev => ({ ...prev, image: uploadData.secure_url }));
                                                            return;
                                                        }
                                                    } catch (directError) {
                                                        console.warn('Direct upload failed, switching to server fallback...', directError);
                                                        throw new DirectUploadError();
                                                    }

                                                } catch (clientError) {
                                                    // Attempt 2: Server-Side Fallback (For small files <4.5MB)
                                                    try {
                                                        const fallbackFormData = new FormData();
                                                        fallbackFormData.append('file', file);

                                                        const serverRes = await fetch('/api/upload', {
                                                            method: 'POST',
                                                            body: fallbackFormData
                                                        });

                                                        const serverData = await serverRes.json();

                                                        if (serverData.success) {
                                                            setFormData(prev => ({ ...prev, image: serverData.url }));
                                                        } else {
                                                            // If server also failed (e.g. payload too large), show specific error
                                                            throw new Error(serverData.error || 'Upload failed');
                                                        }
                                                    } catch (serverError) {
                                                        console.error('Final upload failure:', serverError);
                                                        alert('Upload failed: ' + (serverError instanceof Error ? serverError.message : 'Unknown error'));
                                                    }
                                                }
                                            }}
                                            className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink file:mr-4 file:py-2 file:px-4 file:rounded-btn file:border-0 file:text-sm file:font-semibold file:bg-gold-soft file:text-gold-strong hover:file:bg-gold-soft transition-all text-sm cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                                    placeholder="Or enter image URL manually..."
                                />

                                {formData.image ? (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border group">
                                        <Image
                                            src={formData.image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                            Preview
                                        </div>
                                    </div>
                                ) : (
                                    <div className="aspect-video rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted">
                                        <ImageIcon size={32} className="mb-2" />
                                        <span className="text-sm">No image selected</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-ink mb-1">
                                    Image Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={formData.alt}
                                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                                    className="w-full px-4 py-2 rounded-btn border border-border bg-surface-sunken text-ink focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                                    placeholder="Describe the image for SEO..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <PasswordConfirmModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onConfirm={handleFinalSubmit}
                title={isEditing ? 'Confirm Update' : 'Confirm Publish'}
                description="This action requires admin authorization. Please enter your password to proceed."
                actionLabel={isEditing ? 'Update Post' : 'Publish Post'}
            />
        </>
    );
}

class DirectUploadError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'DirectUploadError';
    }
}
