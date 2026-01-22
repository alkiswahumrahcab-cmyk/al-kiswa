'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChatBox.module.css';
import { Send, X, Minus, MessageSquare, Bot } from 'lucide-react';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

interface AIChatBoxProps {
    contactPhone?: string;
    contactEmail?: string;
}

export default function AIChatBox({ contactPhone, contactEmail }: AIChatBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            content: 'As-salamu alaykum! Welcome to Al Kiswa Umrah Transport. How can I assist you with your journey today?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const lowerInput = userMsg.content.toLowerCase();
            let responseText = "I'd be happy to help you with that. For the best assistance, please contact our support team directly via WhatsApp.";

            if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
                responseText = "Our prices are very competitive! You can check our standard rates on the 'Pricing' page, or use the booking form to get an exact quote for your trip.";
            } else if (lowerInput.includes('book') || lowerInput.includes('reservation')) {
                responseText = "You can easily book a ride using the form on our homepage. It takes just a few minutes!";
            } else if (lowerInput.includes('jeddah') || lowerInput.includes('makkah') || lowerInput.includes('madinah')) {
                responseText = "We cover all major routes between Jeddah, Makkah, and Madinah. Our drivers are experienced and know the best routes.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('salam') || lowerInput.includes('hi')) {
                responseText = "Wa alaykumu s-salam! How can I help you plan your Umrah transport?";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const quickReplies = [
        "Check Prices",
        "Book a Ride",
        "Contact Support"
    ];

    const handleQuickReply = (text: string) => {
        setInputValue(text);
        // triggers verify/send logic needed?
        // For now just set it so user can click send, or auto-send:
        // Let's auto send for smoother UX
        // Need to bypass the form event
        // We'll just call logic directly but state updates in React batching might be tricky 
        // if we use inputValue immediately. 
        // Better to just set input and let user click, OR pass text directly to a sender helper.
        // Implementing direct send helper for cleaner code:
        sendText(text);
    };

    const sendText = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            let responseText = "";
            if (text === "Check Prices") {
                responseText = "You can view our detailed pricing table in the menu, or start a booking to see the exact fare.";
            } else if (text === "Book a Ride") {
                responseText = "Great! You can use the Quick Booking form on our homepage to secure your ride immediately.";
            } else if (text === "Contact Support") {
                responseText = `You can reach us at ${contactPhone || '+966 54 549 4921'} or email ${contactEmail || 'info@alkiswacab.com'}.`;
            } else {
                responseText = "I'm here to help. what else would you like to know?";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1000);
    };


    return (
        <div className={styles.container}>
            {/* Welcome Bubble */}
            {!isOpen && (
                <div className={styles.welcomeBubble} onClick={toggleChat}>
                    <div className={styles.bubbleContent}>
                        <Bot size={20} className="text-[#EFBF5B]" />
                        <span>Need help with your booking?</span>
                    </div>
                </div>
            )}

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.chatHeader}>
                    <div className={styles.headerTitle}>
                        <h3>AI Assistant</h3>
                        <p>Al Kiswa Support</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={toggleChat} className={styles.minimizeButton}>
                            <Minus size={18} />
                        </button>
                        <button onClick={toggleChat} className={styles.closeButton}>
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className={styles.messages}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}
                        >
                            <div className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
                                {msg.content}
                            </div>
                            <span className={styles.timestamp}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                            <div className={`${styles.message} ${styles.aiMessage}`}>
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className={styles.quickReplies}>
                    {quickReplies.map((reply) => (
                        <button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            className={styles.quickReplyChip}
                        >
                            {reply}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className={styles.inputArea}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className={styles.input}
                    />
                    <button type="submit" className={styles.sendButton} disabled={!inputValue.trim()}>
                        <Send size={20} />
                    </button>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                className={`${styles.toggleButton} ${isOpen ? styles.open : ''}`}
                onClick={toggleChat}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X size={28} /> : (
                    <div className="relative w-full h-full p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="Al Kiswa Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
            </button>
        </div>
    );
}
