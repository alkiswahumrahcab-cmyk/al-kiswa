"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function MobileDrawer({ isOpen, onClose, title, children }: MobileDrawerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobile, isOpen]);

  if (!mounted) return null;

  if (isMobile) {
    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <div id="mobile-drawer-portal" className="fixed inset-0 z-[9999] flex flex-col justify-end pointer-events-auto">
            <motion.div 
              key="backdrop"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              key="drawer"
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-surface/95 backdrop-blur-2xl w-full rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-border flex flex-col items-center sticky top-0 z-10">
                <div className="w-12 h-1.5 bg-border rounded-full mb-3" />
                {title && <h3 className="text-ink font-bold text-lg w-full text-center pr-8">{title}</h3>}
                <button onClick={onClose} className="absolute right-4 top-4 text-muted hover:text-ink p-2 rounded-btn hover:bg-surface-alt transition-colors">
                   <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar w-full pb-8">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="desktop-dropdown"
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -5 }}
          className="absolute left-0 right-0 z-50 bg-surface/95 backdrop-blur-2xl border border-border rounded-xl shadow-xl overflow-hidden mt-2"
          style={{ top: '100%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
