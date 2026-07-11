'use client';

/**
 * src/components/chat/AssistantWidget.tsx
 *
 * Premium Al Kiswah AI assistant — "Sara, your Umrah companion"
 *
 * Design thesis: deep charcoal ground, fine gold thread, restraint, reverence.
 * The Kiswah aesthetic applied to a chat interface.
 *
 * Shells:
 *   Desktop ≥768px → floating panel, bottom-right, scale+fade open
 *   Mobile  <768px → native bottom-sheet with drag-to-dismiss
 *
 * All colours from existing Tailwind theme tokens — zero hardcoded hex.
 */

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
  KeyboardEvent,
  FormEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
} from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_URL = 'https://wa.me/966548707332';
const WHATSAPP_NUM = '+966 54 870 7332';

const QUICK_REPLIES = [
  { label: 'Airport → Makkah price', text: 'What is the price from Jeddah Airport to Makkah?' },
  { label: 'Book a car',             text: 'I would like to book a car for my journey.' },
  { label: 'Ziyarat tours',          text: 'Tell me about your Makkah and Madinah Ziyarat tours.' },
  { label: 'Chat on WhatsApp',       text: '__whatsapp__' },
] as const;

// ts is set to Date.now() when loaded into reducer initial state (below)
const WELCOME_MESSAGE_CONTENT = {
  id:      'welcome',
  role:    'assistant' as const,
  content:
    'As-salamu alaykum wa rahmatullahi wa barakatuh.\n\n' +
    'I\'m **Sara**, your Al Kiswah journey companion. I can help you with routes and pricing, ' +
    'Ziyarat site guidance, and booking your transport — all grounded in our real services.\n\n' +
    'How may I assist your Umrah journey today?',
};

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id:          string;
  role:        'user' | 'assistant';
  content:     string;
  isStreaming?: boolean;
  ts:          number;
}

type WidgetState = {
  isOpen:         boolean;
  bubbleDismissed:boolean;
  messages:       ChatMessage[];
  draft:          string;
  isStreaming:    boolean;
  bookingRef:     string | null;
  sessionId:      string;
};

type WidgetAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'DISMISS_BUBBLE' }
  | { type: 'SET_DRAFT'; payload: string }
  | { type: 'SEND_USER'; payload: ChatMessage }
  | { type: 'ADD_ASSISTANT_PLACEHOLDER'; payload: ChatMessage }
  | { type: 'STREAM_TOKEN'; id: string; text: string }
  | { type: 'STREAM_DONE'; id: string }
  | { type: 'STREAM_ERROR'; id: string; error: string }
  | { type: 'SET_BOOKING_REF'; payload: string }
  | { type: 'SET_STREAMING'; payload: boolean };

function reducer(state: WidgetState, action: WidgetAction): WidgetState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true, bubbleDismissed: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'DISMISS_BUBBLE':
      return { ...state, bubbleDismissed: true };
    case 'SET_DRAFT':
      return { ...state, draft: action.payload };
    case 'SEND_USER':
      return { ...state, messages: [...state.messages, action.payload], draft: '' };
    case 'ADD_ASSISTANT_PLACEHOLDER':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'STREAM_TOKEN':
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.id
            ? { ...m, content: m.content + action.text, isStreaming: true }
            : m
        ),
      };
    case 'STREAM_DONE':
      return {
        ...state,
        isStreaming: false,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, isStreaming: false } : m
        ),
      };
    case 'STREAM_ERROR':
      return {
        ...state,
        isStreaming: false,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, content: action.error, isStreaming: false } : m
        ),
      };
    case 'SET_BOOKING_REF':
      return { ...state, bookingRef: action.payload };
    case 'SET_STREAMING':
      return { ...state, isStreaming: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown renderer — safe minimal subset
// ─────────────────────────────────────────────────────────────────────────────

function renderMarkdown(text: string): string {
  return (
    text
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="ak-code">$1</code>')
      // Links
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="ak-link">$1</a>'
      )
      // Line breaks
      .replace(/\n/g, '<br />')
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Three-dot typing indicator — slow, calm pulse */
function TypingDots() {
  return (
    <div className="flex items-center gap-[5px] px-1 py-0.5" aria-label="Typing…">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-[7px] h-[7px] rounded-full bg-n-400"
          style={{
            animation: 'ak-dot-pulse 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Gold hairline separator — the Kiswah signature */
function GoldHairline() {
  return (
    <div className="relative h-px mx-0 flex-shrink-0">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Central embroidery detail */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
        aria-hidden="true"
      >
        <span className="block w-6 h-px bg-gold/80" />
        <span className="block w-1 h-1 rotate-45 border border-gold/80 bg-transparent" />
        <span className="block w-6 h-px bg-gold/80" />
      </div>
    </div>
  );
}

/** Formatted timestamp */
function Timestamp({ ts }: { ts: number }) {
  const d = new Date(ts);
  const t = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <time
      dateTime={d.toISOString()}
      className="block mt-1 text-[10px] text-n-400 select-none"
    >
      {t}
    </time>
  );
}

/** Individual message bubble */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 overflow-hidden
                     border border-gold/25 bg-charcoal"
          aria-hidden="true"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={28}
            height={28}
            className="w-full h-full object-contain p-1"
          />
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Bubble */}
        <div
          className={`
            rounded-2xl px-4 py-2.5 text-[14px] leading-[1.65]
            ${isUser
              ? 'bg-gold text-charcoal rounded-br-[4px] font-medium shadow-sm'
              : 'bg-card border border-border text-foreground rounded-bl-[4px] shadow-sm'
            }
          `}
          // Announce new assistant messages to screen readers
          {...(!isUser ? { 'aria-live': 'polite' as const, 'aria-atomic': 'true' } : {})}
        >
          {/* Show typing dots while waiting for first token */}
          {msg.isStreaming && msg.content === '' ? (
            <TypingDots />
          ) : (
            <>
              <span
                className="ak-prose"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />
              {/* Blinking caret while streaming */}
              {msg.isStreaming && msg.content !== '' && (
                <span
                  className="inline-block w-[2px] h-[1em] ml-[2px] bg-gold/80 align-middle"
                  style={{ animation: 'ak-caret 1s step-start infinite' }}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </div>
        <Timestamp ts={msg.ts} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop Panel
// ─────────────────────────────────────────────────────────────────────────────

interface PanelProps {
  state:      WidgetState;
  dispatch:   React.Dispatch<WidgetAction>;
  onSend:     (text: string) => void;
  onClose:    () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  textareaRef:React.RefObject<HTMLTextAreaElement | null>;
}

function DesktopPanel({ state, dispatch, onSend, onClose, messagesEndRef, textareaRef }: PanelProps) {
  const { messages, draft, isStreaming, bookingRef } = state;
  const showQuickReplies = messages.length <= 1 && !isStreaming;

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(draft);
    }
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Al Kiswah AI assistant"
      aria-modal="true"
      key="desktop-panel"
      initial={{ opacity: 0, scale: 0.94, y: 12, transformOrigin: 'bottom right' }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{   opacity: 0, scale: 0.94, y: 12  }}
      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
      className="
        w-[400px] flex flex-col overflow-hidden
        bg-background border border-border
        rounded-2xl
        shadow-[0_24px_64px_hsl(var(--charcoal)/0.35),0_0_0_1px_hsl(var(--gold)/0.08)]
      "
      style={{ height: '568px' }}
    >
      {/* ── Header ── */}
      <PanelHeader onClose={onClose} />

      {/* ── Gold Hairline ── */}
      <GoldHairline />

      {/* ── Booking Confirmation ── */}
      <AnimatePresence>
        {bookingRef && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            className="overflow-hidden flex-shrink-0"
          >
            <BookingBanner ref_={bookingRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Messages ── */}
      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        messagesEndRef={messagesEndRef}
      />

      {/* ── Quick Replies ── */}
      <AnimatePresence>
        {showQuickReplies && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0 }}
            className="px-4 pt-2 pb-1 flex flex-wrap gap-1.5 flex-shrink-0 border-t border-border/60"
          >
            {QUICK_REPLIES.map((qr) => (
              <QuickReplyChip
                key={qr.label}
                label={qr.label}
                onSelect={() =>
                  qr.text === '__whatsapp__'
                    ? window.open(WHATSAPP_URL, '_blank')
                    : onSend(qr.text)
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <InputArea
          value={draft}
          onChange={(v) => {
            dispatch({ type: 'SET_DRAFT', payload: v });
            autoResize();
          }}
          onSend={() => onSend(draft)}
          onKeyDown={handleKey}
          disabled={isStreaming}
          textareaRef={textareaRef}
        />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Bottom Sheet
// ─────────────────────────────────────────────────────────────────────────────

function MobileSheet({ state, dispatch, onSend, onClose, messagesEndRef, textareaRef }: PanelProps) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 280], [1, 0]);

  const { messages, draft, isStreaming, bookingRef } = state;
  const showQuickReplies = messages.length <= 1 && !isStreaming;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 400) {
      onClose();
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(draft);
    }
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="mobile-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{   opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-charcoal/60 z-[9998] touch-none"
        style={{ opacity }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <motion.div
        key="mobile-sheet"
        role="dialog"
        aria-label="Al Kiswah AI assistant"
        aria-modal="true"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{   y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 38, mass: 0.9 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.3 }}
        onDragEnd={handleDragEnd}
        className="
          fixed inset-x-0 bottom-0 z-[9999]
          flex flex-col
          bg-background
          rounded-t-[20px]
          shadow-[0_-8px_40px_hsl(var(--charcoal)/0.3)]
          overflow-hidden
          touch-none
        "
        style={{
          height: 'calc(var(--vh, 1vh) * 88)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Drag Handle */}
        <div className="flex-shrink-0 flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <PanelHeader onClose={onClose} />

        {/* Hairline */}
        <GoldHairline />

        {/* Booking Confirmation */}
        <AnimatePresence>
          {bookingRef && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              className="overflow-hidden flex-shrink-0"
            >
              <BookingBanner ref_={bookingRef} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          messagesEndRef={messagesEndRef}
        />

        {/* Quick Replies */}
        <AnimatePresence>
          {showQuickReplies && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              className="px-4 pt-2 pb-1 flex flex-wrap gap-2 flex-shrink-0 border-t border-border/60"
            >
              {QUICK_REPLIES.map((qr) => (
                <QuickReplyChip
                  key={qr.label}
                  label={qr.label}
                  onSelect={() =>
                    qr.text === '__whatsapp__'
                      ? window.open(WHATSAPP_URL, '_blank')
                      : onSend(qr.text)
                  }
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input — sits above keyboard */}
        <InputArea
          value={draft}
          onChange={(v) => {
            dispatch({ type: 'SET_DRAFT', payload: v });
            autoResize();
          }}
          onSend={() => onSend(draft)}
          onKeyDown={handleKey}
          disabled={isStreaming}
          textareaRef={textareaRef}
          mobile
        />
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

function PanelHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 bg-charcoal">
      {/* Avatar */}
      <div
        className="
          w-10 h-10 rounded-full flex-shrink-0
          border border-gold/30 bg-n-800
          overflow-hidden
          shadow-[0_0_0_2px_hsl(var(--gold)/0.12)]
        "
        aria-hidden="true"
      >
        <Image
          src="/icon.svg"
          alt=""
          width={40}
          height={40}
          className="w-full h-full object-contain p-1.5"
        />
      </div>

      {/* Identity */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base leading-tight font-display font-semibold text-gold tracking-wide">
          Sara
        </h2>
        <p className="text-[11px] text-n-400 tracking-wide flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
          Al Kiswah Umrah Guide
        </p>
      </div>

      {/* WhatsApp shortcut */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-1.5 flex-shrink-0
          text-[11px] font-semibold uppercase tracking-wider
          text-n-300 hover:text-gold
          border border-n-600 hover:border-gold/40
          px-2.5 py-1.5 rounded-full
          transition-all duration-200
          min-h-[36px]
        "
        aria-label="Chat on WhatsApp"
      >
        <PhoneCall size={12} />
        <span className="hidden sm:inline">Live Agent</span>
      </a>

      {/* Close */}
      <button
        onClick={onClose}
        className="
          w-8 h-8 flex items-center justify-center
          rounded-full text-n-400
          hover:text-gold hover:bg-gold/10
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
          transition-all duration-150
          flex-shrink-0
          min-h-[32px] min-w-[32px]
        "
        aria-label="Close assistant"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function BookingBanner({ ref_ }: { ref_: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[hsl(var(--success)/0.08)] border-b border-[hsl(var(--success)/0.2)]">
      <CheckCircle2 size={16} className="text-[hsl(var(--success))] flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold text-[hsl(var(--success))]">Booking Confirmed</p>
        <p className="text-[11px] text-muted-foreground">
          Ref: <span className="font-bold text-foreground">{ref_}</span>
          {' '}· Confirmation email sent with PDF receipt
        </p>
      </div>
    </div>
  );
}

function MessageList({
  messages,
  isStreaming,
  messagesEndRef,
}: {
  messages:       ChatMessage[];
  isStreaming:    boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  const lastRole = messages[messages.length - 1]?.role;

  return (
    <div
      className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4"
      role="log"
      aria-live="polite"
      aria-label="Conversation"
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}

      {/* Pre-stream typing indicator — only before first token arrives */}
      {isStreaming && lastRole === 'user' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 justify-start"
        >
          <div className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 overflow-hidden border border-gold/25 bg-charcoal">
            <Image src="/icon.svg" alt="" width={28} height={28} className="w-full h-full object-contain p-1" />
          </div>
          <div className="bg-card border border-border rounded-2xl rounded-bl-[4px] px-4 py-3 shadow-sm">
            <TypingDots />
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} className="h-1" aria-hidden="true" />
    </div>
  );
}

function QuickReplyChip({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="
        text-[12px] font-medium
        px-3 py-1.5 rounded-full
        border border-border text-muted-foreground
        bg-transparent
        hover:border-gold/60 hover:text-gold hover:bg-gold/5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
        transition-all duration-200
        min-h-[32px]
        active:scale-95
      "
    >
      {label}
    </button>
  );
}

interface InputAreaProps {
  value:       string;
  onChange:    (v: string) => void;
  onSend:      () => void;
  onKeyDown:   (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled:    boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  mobile?:     boolean;
}

function InputArea({ value, onChange, onSend, onKeyDown, disabled, textareaRef, mobile }: InputAreaProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      className={`
        flex-shrink-0 flex items-end gap-2 px-3 py-3
        border-t border-border bg-card
        ${mobile ? 'pb-[env(safe-area-inset-bottom,12px)]' : ''}
      `}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask about routes, prices, or book a car…"
        disabled={disabled}
        rows={1}
        maxLength={600}
        className="
          flex-1 min-w-0 resize-none overflow-hidden
          text-[16px] leading-[1.5]
          bg-muted border border-border
          rounded-xl px-3.5 py-2.5
          text-foreground placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-gold/35 focus:border-gold/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          min-h-[44px] max-h-[96px]
        "
        aria-label="Message input"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        aria-label="Send message"
        className="
          w-11 h-11 flex-shrink-0 flex items-center justify-center
          bg-gold text-charcoal rounded-xl
          hover:bg-gold-dark
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2
          disabled:opacity-35 disabled:cursor-not-allowed
          active:scale-95
          transition-all duration-150
          shadow-sm
        "
      >
        <Send size={17} strokeWidth={2.2} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Launcher
// ─────────────────────────────────────────────────────────────────────────────

function Launcher({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="relative flex-shrink-0">
      {/* Slow attention pulse — respects reduced-motion via CSS */}
      {!isOpen && (
        <span
          className="
            absolute inset-0 rounded-full border border-gold/50
            ak-launcher-pulse
          "
          aria-hidden="true"
        />
      )}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{   scale: 0.93 }}
        aria-label={isOpen ? 'Close AI assistant' : 'Open Al Kiswah assistant — Sara your guide'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="
          relative z-10
          w-14 h-14 rounded-full
          bg-charcoal border border-gold/35
          flex items-center justify-center
          shadow-[0_4px_24px_hsl(var(--charcoal)/0.5),0_0_0_1px_hsl(var(--gold)/0.1)]
          hover:border-gold/60
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2
          transition-all duration-200
          overflow-hidden
        "
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate:  45, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="text-gold"
            >
              <X size={20} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ rotate: 15, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0,  opacity: 1, scale: 1   }}
              exit={{   rotate:-15, opacity: 0, scale: 0.8  }}
              transition={{ duration: 0.16 }}
              className="relative w-8 h-8"
            >
              <Image
                src="/icon.svg"
                alt=""
                fill
                sizes="32px"
                className="object-contain"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Welcome bubble
// ─────────────────────────────────────────────────────────────────────────────

function WelcomeBubble({ onOpen, onDismiss }: { onOpen: () => void; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1   }}
      exit={{   opacity: 0, y: 8, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="
        relative max-w-[230px] cursor-pointer
        bg-card border border-border
        rounded-2xl rounded-br-[4px]
        shadow-[0_8px_32px_hsl(var(--charcoal)/0.18)]
        px-4 py-3
      "
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      aria-label="Open Al Kiswah AI assistant"
    >
      {/* Dismiss × */}
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        className="
          absolute -top-2 -right-2
          w-5 h-5 rounded-full
          bg-card border border-border
          flex items-center justify-center
          text-muted-foreground hover:text-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40
          transition-colors
        "
        aria-label="Dismiss suggestion"
      >
        <X size={10} strokeWidth={2.5} />
      </button>

      {/* Gold left accent bar */}
      <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-gold/80 to-gold/20 rounded-full" />

      <p className="text-[13px] text-foreground font-medium leading-snug pl-3">
        Need help planning your Umrah journey?
      </p>
      <p className="text-[11px] text-muted-foreground mt-0.5 pl-3">
        Ask Sara — routes, prices, ziyarat
      </p>

      {/* Pointer */}
      <div
        className="absolute bottom-[-7px] right-5
          border-l-[7px] border-l-transparent
          border-r-[7px] border-r-transparent
          border-t-[7px] border-t-card"
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main widget orchestrator
// ─────────────────────────────────────────────────────────────────────────────

export default function AssistantWidget() {
  const [state, dispatch] = useReducer(reducer, {
    isOpen:          false,
    bubbleDismissed: false,
    messages:        [{ ...WELCOME_MESSAGE_CONTENT, ts: Date.now() }],
    draft:           '',
    isStreaming:     false,
    bookingRef:      null,
    sessionId:       uuidv4(),
  });

  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);
  const abortRef       = useRef<AbortController | null>(null);
  const panelRef       = useRef<HTMLDivElement>(null);

  // ── Detect mobile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // ── Visual viewport: keep input above keyboard on mobile ──────────────────
  useEffect(() => {
    if (!isMobile) return;
    const setVH = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };
    setVH();
    window.visualViewport?.addEventListener('resize', setVH);
    window.addEventListener('resize', setVH);
    return () => {
      window.visualViewport?.removeEventListener('resize', setVH);
      window.removeEventListener('resize', setVH);
    };
  }, [isMobile]);

  // ── Lock body scroll when sheet is open on mobile ─────────────────────────
  useEffect(() => {
    if (isMobile && state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, state.isOpen]);

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isStreaming]);

  // ── Focus input on open ────────────────────────────────────────────────────
  useEffect(() => {
    if (state.isOpen) {
      const t = setTimeout(() => textareaRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [state.isOpen]);

  // ── Keyboard: Escape closes, click outside closes (desktop) ───────────────
  useEffect(() => {
    if (!state.isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.isOpen]);

  // Click outside (desktop only)
  useEffect(() => {
    if (!state.isOpen || isMobile) return;
    const onPointer = (e: PointerEvent) => {
      const panel = document.getElementById('ak-panel');
      const launcher = document.getElementById('ak-launcher');
      if (panel && !panel.contains(e.target as Node) &&
          launcher && !launcher.contains(e.target as Node)) {
        handleClose();
      }
    };
    window.addEventListener('pointerdown', onPointer, { capture: true });
    return () => window.removeEventListener('pointerdown', onPointer, { capture: true });
  }, [state.isOpen, isMobile]);

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || state.isStreaming) return;

    const userMsg: ChatMessage = {
      id:   uuidv4(),
      role: 'user',
      content: text.trim(),
      ts:   Date.now(),
    };
    const assistantMsgId = uuidv4();
    const assistantMsg: ChatMessage = {
      id:          assistantMsgId,
      role:        'assistant',
      content:     '',
      isStreaming: true,
      ts:          Date.now(),
    };

    dispatch({ type: 'SEND_USER', payload: userMsg });
    dispatch({ type: 'SET_STREAMING', payload: true });
    dispatch({ type: 'ADD_ASSISTANT_PLACEHOLDER', payload: assistantMsg });

    // Build history excluding the empty placeholder
    const history = [...state.messages, userMsg].map((m) => ({
      role:    m.role,
      content: m.content,
    }));

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch('/api/assistant', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: history, sessionId: state.sessionId }),
        signal:  ctrl.signal,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.text)       dispatch({ type: 'STREAM_TOKEN', id: assistantMsgId, text: parsed.text });
            if (parsed.bookingRef) dispatch({ type: 'SET_BOOKING_REF', payload: parsed.bookingRef });
            if (parsed.done)       dispatch({ type: 'STREAM_DONE', id: assistantMsgId });
          } catch { /* malformed chunk */ }
        }
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      dispatch({
        type: 'STREAM_ERROR',
        id:   assistantMsgId,
        error: 'I\'m sorry, a connection issue occurred. Please try again or reach us on WhatsApp.',
      });
    } finally {
      abortRef.current = null;
    }
  }, [state.isStreaming, state.messages, state.sessionId]);

  const handleOpen  = () => dispatch({ type: 'OPEN' });
  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
    abortRef.current?.abort();
  };

  const sharedProps: PanelProps = {
    state,
    dispatch,
    onSend:      sendMessage,
    onClose:     handleClose,
    messagesEndRef,
    textareaRef,
  };

  const showBubble = !state.isOpen && !state.bubbleDismissed;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes ak-dot-pulse {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40%            { opacity: 1;    transform: scale(1);    }
        }
        @keyframes ak-caret {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes ak-launcher-ring {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .ak-launcher-pulse {
          animation: ak-launcher-ring 2.8s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ak-launcher-pulse { animation: none; }
          .ak-dot-pulse       { animation: none !important; opacity: 0.6 !important; }
          .ak-caret           { animation: none !important; opacity: 1  !important; }
        }
        .ak-code {
          font-family: var(--font-geist-mono, monospace);
          font-size: 0.875em;
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 4px;
          padding: 0 4px;
        }
        .ak-link {
          color: hsl(var(--gold));
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .ak-link:hover { opacity: 0.8; }
        .ak-prose strong { font-weight: 600; }
        .ak-prose em { font-style: italic; }
      `}</style>

      {/* ── Desktop: fixed bottom-right stack ── */}
      <div
        className="hidden md:flex fixed bottom-6 right-6 z-[9999] flex-col items-end gap-3"
        aria-label="Al Kiswah AI assistant"
      >
        {/* Welcome bubble */}
        <AnimatePresence>
          {showBubble && (
            <WelcomeBubble
              onOpen={handleOpen}
              onDismiss={() => dispatch({ type: 'DISMISS_BUBBLE' })}
            />
          )}
        </AnimatePresence>

        {/* Panel */}
        <AnimatePresence>
          {state.isOpen && (
            <div id="ak-panel">
              <DesktopPanel {...sharedProps} />
            </div>
          )}
        </AnimatePresence>

        {/* Launcher */}
        <div id="ak-launcher">
          <Launcher isOpen={state.isOpen} onClick={state.isOpen ? handleClose : handleOpen} />
        </div>
      </div>

      {/* ── Mobile: bottom-sheet + launcher ── */}
      <div
        className="md:hidden"
        aria-label="Al Kiswah AI assistant"
      >
        {/* Bubble — above the launcher */}
        <div className="fixed bottom-[88px] right-4 z-[9997]">
          <AnimatePresence>
            {showBubble && (
              <WelcomeBubble
                onOpen={handleOpen}
                onDismiss={() => dispatch({ type: 'DISMISS_BUBBLE' })}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Launcher FAB */}
        <div
          className="fixed bottom-5 right-4 z-[9999]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          id="ak-launcher"
        >
          <Launcher isOpen={state.isOpen} onClick={state.isOpen ? handleClose : handleOpen} />
        </div>

        {/* Bottom sheet */}
        <AnimatePresence>
          {state.isOpen && <MobileSheet {...sharedProps} />}
        </AnimatePresence>
      </div>
    </>
  );
}
