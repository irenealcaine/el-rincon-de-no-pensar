import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({
  open,
  onClose,
  label,
  children,
  contentClassName = "",
  containerClassName = "",
  showCloseButton = true,
  closeOnBackdrop = true,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement;
    const modal = modalRef.current;

    const getFocusables = () =>
      modal.querySelectorAll(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );

    (getFocusables()[0] || modal)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const focusables = getFocusables();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className={`fixed inset-0 z-20 flex items-center justify-center p-4 md:p-10 ${containerClassName}`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-md" />

      {showCloseButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="Cerrar"
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-30 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 active:scale-90"
        >
          <FiX size={22} />
        </button>
      )}

      <div
        className={`modal-image relative ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;