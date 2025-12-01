import Button from './Button.jsx';

const Modal = ({ title, children, isOpen, onClose, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
        <div>{children}</div>
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
