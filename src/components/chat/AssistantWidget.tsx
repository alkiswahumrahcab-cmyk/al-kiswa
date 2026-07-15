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
 *   Desktop ≥768px → Right-docked side panel, vertically centered with small insets. Slides in from right.
 *   Mobile  <768px → Bottom-sheet (drag down to dismiss) + Docked invite bar launcher.
 *
 * All colours from existing Tailwind theme tokens — zero hardcoded hexes.
 */

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
  KeyboardEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  useReducedMotion,
} from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────



const WELCOME_MESSAGE_CONTENT = {
  id:      'welcome',
  role:    'assistant' as const,
  content:
    'As-salamu alaykum wa rahmatullahi wa barakatuh.\n\n' +
    "I'm **Sara**, your Al Kiswah journey companion. I can help you with routes and pricing, " +
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
  messages:       ChatMessage[];
  draft:          string;
  isStreaming:    boolean;
  bookingRef:     string | null;
  sessionId:      string;
};

type WidgetAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
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
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
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

const tokenRegex = /(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|`[\s\S]*?`|\[[\s\S]*?\]\(https?:\/\/[^)]+\)|https?:\/\/[a-zA-Z0-9\-._~:/?#\[\]@!$&'+,;=%]+|\n)/g;

function renderMessageNodes(text: string) {
  const parts = text.split(tokenRegex);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part === '\n') return <br key={i} />;
    
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="ak-code">{part.slice(1, -1)}</code>;
    }
    
    const mdLinkMatch = part.match(/^\[([\s\S]*?)\]\((https?:\/\/[^)]+)\)$/);
    if (mdLinkMatch) {
      return (
        <a key={i} href={mdLinkMatch[2]} target="_blank" rel="noopener noreferrer" className="ak-link break-words">
          {mdLinkMatch[1]}
        </a>
      );
    }
    
    if (part.match(/^https?:\/\/[a-zA-Z0-9\-._~:/?#\[\]@!$&'+,;=%]+$/)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="ak-link break-all">
          {part}
        </a>
      );
    }
    
    return <span key={i}>{part}</span>;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useFocusTrap(ref: React.RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;
    
    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [isActive, ref]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

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

function GoldHairline() {
  return (
    <div className="relative h-px mx-0 flex-shrink-0">
      {/* Base line using theme token with opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Central embroidery detail */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
        aria-hidden="true"
      >
        <span className="block w-6 h-px bg-gold" />
        <span className="block w-1 h-1 rotate-45 border border-gold bg-transparent" />
        <span className="block w-6 h-px bg-gold" />
      </div>
    </div>
  );
}

function Timestamp({ ts }: { ts: number }) {
  const d = new Date(ts);
  const t = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <time
      dateTime={d.toISOString()}
      className="block mt-1 text-[10px] text-muted select-none"
    >
      {t}
    </time>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 overflow-hidden
                     border border-gold/25 bg-ink"
          aria-hidden="true"
        >
          <Image
            src="/sara-avatar-v6.png"
            alt=""
            width={56}
            height={56}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`
            rounded-2xl px-4 py-2.5 text-[14px] leading-[1.65] shadow-sm
            ${isUser
              ? 'bg-gold text-surface rounded-br-[4px] font-medium'
              : 'bg-surface-alt border border-border text-ink rounded-bl-[4px]'
            }
          `}
          {...(!isUser ? { 'aria-live': 'polite' as const, 'aria-atomic': 'true' } : {})}
        >
          {msg.isStreaming && msg.content === '' ? (
            <TypingDots />
          ) : (
            <>
              <span className="ak-prose">
                {renderMessageNodes(msg.content)}
              </span>
              {msg.isStreaming && msg.content !== '' && (
                <span
                  className="inline-block w-[2px] h-[1em] ml-[2px] bg-gold align-middle"
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
// Desktop Panel (Docked to the right)
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

  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useFocusTrap(panelRef, true);

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
      {/* Light Scrim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-ink/15 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-label="Al Kiswah AI assistant"
        aria-modal="true"
        key="desktop-panel"
        initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%', opacity: 0.5 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%', opacity: 0.5 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
        className="
          fixed top-0 bottom-0 right-0 z-[9999]
          w-[400px] xl:w-[420px] max-w-[460px] flex flex-col overflow-hidden
          bg-surface border-y-0 border-l border-r-0 border-border
          rounded-l-2xl
          shadow-[-8px_0_40px_rgba(21,20,15,),-1px_0_0_rgba(226,163,54,)]
        "
      >
        <PanelHeader onClose={onClose} />
        <GoldHairline />

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

        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          messagesEndRef={messagesEndRef}
        />



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
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Bottom Sheet & Docked Invite Bar
// ─────────────────────────────────────────────────────────────────────────────

function MobileSheet({ state, dispatch, onSend, onClose, messagesEndRef, textareaRef }: PanelProps) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 280], [1, 0]);
  const shouldReduceMotion = useReducedMotion();

  const { messages, draft, isStreaming, bookingRef } = state;


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
      <motion.div
        key="mobile-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-ink/60 z-[9998] touch-none"
        style={{ opacity }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        key="mobile-sheet"
        role="dialog"
        aria-label="Al Kiswah AI assistant"
        aria-modal="true"
        initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 38, mass: 0.9 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.3 }}
        onDragEnd={handleDragEnd}
        className="
          fixed inset-x-0 bottom-0 z-[9999]
          flex flex-col
          bg-surface
          rounded-t-[20px]
          shadow-[0_-8px_40px_rgba(21,20,15,)]
          overflow-hidden
          touch-none
        "
        style={{
          height: 'calc(var(--vh, 1vh) * 88)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex-shrink-0 flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <PanelHeader onClose={onClose} />
        <GoldHairline />

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

        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          messagesEndRef={messagesEndRef}
        />



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
    <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 bg-ink">
      <div
        className="
          w-10 h-10 rounded-full flex-shrink-0
          border border-gold/30 bg-ink-surface
          overflow-hidden
          shadow-[0_0_0_2px_rgba(226,163,54,)]
        "
        aria-hidden="true"
      >
        <Image
          src="/sara-avatar-v6.png"
          alt=""
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-base leading-tight font-cormorant font-semibold text-gold tracking-wide">
          Sara
        </h2>
        <p className="text-[11px] text-muted tracking-wide flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
          Al Kiswah Umrah Guide
        </p>
      </div>

      <button
        onClick={onClose}
        className="
          w-8 h-8 flex items-center justify-center
          rounded-full text-muted
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
    <div className="flex items-center gap-3 px-4 py-2.5 bg-green-50/10 border-b border-green-500/20">
      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold text-green-500">Booking Confirmed</p>
        <p className="text-[11px] text-muted">
          Ref: <span className="font-bold text-ink">{ref_}</span>
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

      {isStreaming && lastRole === 'user' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 justify-start"
        >
          <div className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 overflow-hidden border border-gold/25 bg-ink">
            <Image src="/sara-avatar-v6.png" alt="" width={56} height={56} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="bg-surface-alt border border-border rounded-2xl rounded-bl-[4px] px-4 py-3 shadow-sm">
            <TypingDots />
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} className="h-1" aria-hidden="true" />
    </div>
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
        border-t border-border bg-surface-alt
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
          bg-bg border border-border
          rounded-xl px-3.5 py-2.5
          text-ink placeholder:text-muted
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
          bg-gold text-surface rounded-xl
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
// Desktop Launcher
// ─────────────────────────────────────────────────────────────────────────────

function DesktopLauncher({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (isOpen) return null; // Hide launcher when panel is open on desktop

  return (
    <div className="relative flex-shrink-0">
      {!shouldReduceMotion && (
        <span
          className="absolute inset-0 rounded-full border border-gold/50 ak-launcher-pulse"
          aria-hidden="true"
        />
      )}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open Al Kiswah assistant — Sara your guide"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="
          relative z-10
          w-14 h-14 rounded-full
          bg-ink border border-gold/35
          flex items-center justify-center
          shadow-[0_4px_24px_rgba(21,20,15,),0_0_0_1px_rgba(226,163,54,)]
          hover:border-gold/60
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2
          transition-all duration-200
          overflow-hidden
        "
      >
        <motion.span
          key="icon"
          initial={{ rotate: 15, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0,  opacity: 1, scale: 1   }}
          exit={{   rotate:-15, opacity: 0, scale: 0.8  }}
          transition={{ duration: 0.16 }}
          className="relative w-full h-full"
        >
          <Image
            src="/sara-avatar-v6.png"
            alt=""
            fill
            sizes="112px"
            className="object-cover rounded-full"
          />
        </motion.span>
      </motion.button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Docked Invite Bar
// ─────────────────────────────────────────────────────────────────────────────

function MobileDockedBar({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolled(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(false);
      }, 500); // Expand back after 500ms of no scrolling
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  if (isOpen) return null;

  return (
    <motion.div
      layout={!shouldReduceMotion}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`
        fixed bottom-[110px] md:bottom-5 right-4 z-[9995]
        bg-surface-alt rounded-full
        border border-border shadow-xl
        overflow-hidden flex items-center justify-center
        w-[56px] h-[56px]
      `}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <button
        onClick={onClick}
        aria-label="Open Al Kiswah assistant"
        className="flex items-center justify-center w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <div className="w-12 h-12 rounded-full flex-shrink-0 bg-surface border border-gold/20 flex items-center justify-center overflow-hidden">
          <Image src="/sara-avatar-v6.png" alt="" width={88} height={88} className="w-full h-full object-cover rounded-full" />
        </div>
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main widget orchestrator
// ─────────────────────────────────────────────────────────────────────────────

export default function AssistantWidget() {
  const [state, dispatch] = useReducer(reducer, {
    isOpen:          false,
    messages:        [{ ...WELCOME_MESSAGE_CONTENT, ts: Date.now() }],
    draft:           '',
    isStreaming:     false,
    bookingRef:      null,
    sessionId:       uuidv4(),
  });

  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);
  const abortRef       = useRef<AbortController | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

  useEffect(() => {
    if (isMobile && state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, state.isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isStreaming]);

  useEffect(() => {
    if (state.isOpen) {
      const t = setTimeout(() => textareaRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [state.isOpen]);

  useEffect(() => {
    if (!state.isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.isOpen]);

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

    const history = [...state.messages, userMsg]
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
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
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      dispatch({
        type: 'STREAM_ERROR',
        id:   assistantMsgId,
        error: "I'm sorry, a connection issue occurred. Please try again or reach us on WhatsApp.",
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

  return (
    <>
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

      {/* Desktop Shell (>=768px) */}
      <div className="hidden md:block" aria-label="Al Kiswah AI assistant">
        <AnimatePresence>
          {state.isOpen && <DesktopPanel {...sharedProps} />}
        </AnimatePresence>
        <div className="fixed bottom-6 right-6 z-[9995]">
          <DesktopLauncher isOpen={state.isOpen} onClick={handleOpen} />
        </div>
      </div>

      {/* Mobile Shell (<768px) */}
      <div className="md:hidden" aria-label="Al Kiswah AI assistant">
        <MobileDockedBar isOpen={state.isOpen} onClick={handleOpen} />
        <AnimatePresence>
          {state.isOpen && <MobileSheet {...sharedProps} />}
        </AnimatePresence>
      </div>
    </>
  );
}
