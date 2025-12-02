import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons, Icon } from '../../utils/icons.jsx';

const Modal = ({ title, children, isOpen, onClose, footer }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  console.log('Modal: Rendering with Portal to document.body');

  // Render modal at document root using Portal
  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 99999
      }}
    >
      <div 
        className="glass rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-2 border-white/40 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b-2 border-purple-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg sm:text-xl font-bold gradient-text flex items-center gap-2">
            <Icon icon={Icons.sparklesSolid} size="md" className="text-purple-500" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-100 rounded-full transition-all hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <Icon icon={Icons.xMark} size="lg" className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t-2 border-purple-200 px-4 sm:px-6 py-4 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
