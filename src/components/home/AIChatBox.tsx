'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, Trash2, ExternalLink, Bot, MessageCircle } from 'lucide-react';
import styles from './AIChatBox.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    action?: {
        label: string;
        url: string;
    };
}

import { useMenu } from '@/context/MenuContext';

interface AIChatBoxProps {
    contactPhone?: string;
    contactEmail?: string;
}

export default function AIChatBox({ contactPhone, contactEmail }: AIChatBoxProps) {
    const { isMenuOpen } = useMenu();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Show greeting bubble instantly for new visitors
        if (!isOpen && messages.length <= 1) {
            const timer = setTimeout(() => {
                setShowGreeting(true);
            }, 1000); // 1s delay for smooth entrance
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Quick Replies Data
    const quickReplies = ['How do I book?', 'Show Today’s Offers', 'Guide me step by step', 'Contact Support'];

    const initializeGreeting = useCallback(() => {
        let greetingText = '';

        const greetings = {
            default: `👋 Welcome to Al Kiswah Transport!
I’m your AI assistant, here to make your visit simple and stress‑free.

You can ask me things like:

‘How do I book a ride?’

‘Show me today’s offers.’

‘Guide me step by step.’

I’ll help you with booking, answer questions, and keep everything easy to read for elders and children. Just type below and I’ll respond instantly!`,
            booking: 'Welcome to our booking page! 📅 Do you need any help filling out the form or choosing a vehicle?',
            fleet: 'Browsing our fleet? 🚗 Let me know if you want to know more about our Sedans, SUVs, or Buses.',
            services: 'We offer VIP services and Ziyarat tours. 🕌 How can I assist you with our services?'
        };

        if (pathname === '/booking') greetingText = greetings.booking;
        else if (pathname === '/fleet') greetingText = greetings.fleet;
        else if (pathname === '/services') greetingText = greetings.services;
        else greetingText = greetings.default;

        setMessages([
            {
                id: '1',
                text: greetingText,
                sender: 'ai',
                timestamp: new Date(),
            },
        ]);
    }, [pathname]);

    // Load messages from localStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatHistory');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                // Convert string timestamps back to Date objects
                const hydrated = parsed.map((msg: Message & { timestamp: string }) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));

                setMessages(hydrated);
            } catch (e) {
                console.error('Failed to parse chat history', e);
            }
        } else {
            // Initial greeting if no history

            initializeGreeting();
        }
    }, [initializeGreeting]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    const clearChat = () => {
        localStorage.removeItem('chatHistory');
        initializeGreeting();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const generateResponse = (input: string): { text: string, action?: { label: string, url: string } } => {
        const lowerInput = input.toLowerCase();

        const responses = {
            price: {
                text: "Our prices are very competitive! Use the Instant Price Calculator on our homepage to get an exact quote for your journey.",
                action: { label: "Open Calculator", url: "/" }
            },
            book: {
                text: "Booking is easy! You can use the 'Book Now' button at the top, or simply fill out the Quick Booking form on the homepage.",
                action: { label: "Book Now", url: "/booking" }
            },
            contact: {
                text: `You can reach us 24/7 via WhatsApp at ${contactPhone || '+966 54 549 4921'} or email us at ${contactEmail || 'info@alkiswahumrah.com'}.`,
                action: {
                    label: "WhatsApp Us",
                    url: `https://wa.me/${(contactPhone || '+966 54 549 4921').replace(/\D/g, '')}`
                }
            },
            vehicle: {
                text: "We offer a wide range of vehicles including comfortable Sedans (Camry, Sonata), spacious SUVs (GMC, H1), and luxury Buses for groups.",
                action: { label: "View Fleet", url: "/fleet" }
            },
            guide: {
                text: "To book a ride, simply:\n1. Click 'Book Now' or use the form on the homepage.\n2. Enter your pickup & drop-off locations.\n3. Choose your vehicle type.\n4. Confirm your details and you're set!",
                action: { label: "Start Booking", url: "/booking" }
            },
            default: {
                text: "I'm here to help! You can ask me about prices, booking, our vehicles, or contact information."
            }
        };

        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) return responses.price;
        if (lowerInput.includes('book') || lowerInput.includes('reserve')) return responses.book;
        if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) return responses.contact;
        if (lowerInput.includes('vehicle') || lowerInput.includes('car') || lowerInput.includes('bus')) return responses.vehicle;
        if (lowerInput.includes('guide') || lowerInput.includes('step') || lowerInput.includes('help')) return responses.guide;

        return responses.default;
    };

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: new Date().getTime().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const response = generateResponse(text);

            const aiMessage: Message = {
                id: (new Date().getTime() + 1).toString(),
                text: response.text,
                sender: 'ai',
                timestamp: new Date(),
                action: response.action
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isMenuOpen) return null;

    return (
        <div className={styles.container}>
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={`${styles.chatHeader} !bg-[#09090b]`}>
                    <div className={styles.headerTitle}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-white/20 shadow-sm overflow-hidden p-1">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/logo.png"
                                        alt="Al Kiswah"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <h3>Al Kiswah AI</h3>
                        </div>
                        <p>Online • Replies instantly</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={clearChat}
                            className={styles.clearButton}
                            aria-label="Clear chat"
                            title="Clear History"
                        >
                            <Trash2 size={16} />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={styles.minimizeButton}
                            aria-label="Minimize chat"
                        >
                            <div className="w-4 h-0.5 bg-current rounded-full" />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={styles.closeButton}
                            aria-label="Close chat"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className={styles.messages}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper}`}
                        >
                            <div
                                className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                                    }`}
                            >
                                {msg.text}
                                {msg.action && (
                                    <Link
                                        href={msg.action.url}
                                        className={styles.messageAction}
                                        target={msg.action.url.startsWith('http') ? '_blank' : undefined}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {msg.action.label}
                                        <ExternalLink size={12} />
                                    </Link>
                                )}
                            </div>
                            <span className={styles.timestamp}>
                                {formatTime(msg.timestamp)}
                            </span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.aiMessage}`}>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className={styles.quickReplies}>
                    {quickReplies.map((reply, index) => (
                        <button
                            key={index}
                            className={styles.quickReplyChip}
                            onClick={() => handleSend(reply)}
                        >
                            {reply}
                        </button>
                    ))}
                </div>

                <div className={styles.inputArea}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className={styles.input}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!inputValue.trim() || isTyping}
                        className={styles.sendButton}
                        aria-label="Send message"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {showGreeting && !isOpen && (
                <div
                    className={styles.welcomeBubble}
                    onClick={() => {
                        setIsOpen(true);
                        setShowGreeting(false);
                    }}
                >
                    <div className={styles.bubbleContent}>
                        Hey! I'm your AI Assistant
                    </div>
                    <div className={styles.bubbleArrow} />
                </div>
            )}

            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowGreeting(false);
                }}
                className={`${styles.toggleButton} ${isOpen ? styles.open : ''}`}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <X size={32} className="text-white drop-shadow-md" />
                ) : (
                    <div className="relative w-12 h-12 transition-transform hover:scale-110 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Al Kiswah"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </div>
                )}
            </button>
        </div >
    );
}
