import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

const toastStyles = {
  success: {
    container: "bg-emerald-600",
    icon: <FiCheckCircle className="h-5 w-5" />,
  },
  error: {
    container: "bg-red-600",
    icon: <FiAlertCircle className="h-5 w-5" />,
  },
  info: {
    container: "bg-blue-700",
    icon: <FiInfo className="h-5 w-5" />,
  },
};

const Toast = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-20 right-5 z-50 flex w-full max-w-xs flex-col gap-3">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type] ?? toastStyles.info;
        return (
          <div
            key={toast.id}
            role="status"
            className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 text-white shadow-xl animate-fade-up ${style.container}`}
          >
            <span className="shrink-0">{style.icon}</span>
            <p className="flex-1 font-bold text-sm leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Cerrar notificación"
              className="shrink-0 rounded-full p-1 transition hover:bg-white/20 active:scale-90"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;