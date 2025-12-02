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
  console.log('Modal: Title:', title);
  console.log('Modal: Has children:', !!children);

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
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-2 border-purple-300"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: 'white' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            ✨ {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all text-white text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 bg-white">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="bg-gray-50 px-4 sm:px-6 py-4 flex justify-end gap-2 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
