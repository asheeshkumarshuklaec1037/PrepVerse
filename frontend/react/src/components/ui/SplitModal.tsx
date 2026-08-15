import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  maxWidth?: string;
}

export const SplitModal: React.FC<SplitModalProps> = ({
  isOpen,
  onClose,
  leftSection,
  rightSection,
  maxWidth = 'max-w-[1000px]',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with 16px Blur matching Django .modal-overlay */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05050a]/80 cursor-pointer"
          />

          {/* Modal Split Wrapper (Matching Django 1:1 Layout) */}
          <div className={`relative w-full ${maxWidth} z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none`}>
            {/* Left Info Column (Ultra Smooth Slide-In & Slide-Out) */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6 pointer-events-auto"
            >
              {leftSection}
            </motion.div>

            {/* Right Card Column (Ultra Smooth Slide-Up & Scale Down) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 pointer-events-auto"
            >
              {rightSection}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
