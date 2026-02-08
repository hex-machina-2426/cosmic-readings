"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Start exit animation after 3.5s
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
    }, 3500);

    // Remove after exit animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const colors: Record<ToastType, string> = {
    success: "border-green-500/40 bg-green-500/10 text-green-200",
    error: "border-red-500/40 bg-red-500/10 text-red-200",
    info: "border-purple-500/40 bg-purple-500/10 text-purple-200",
  };

  const icons: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "✦",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              ${t.exiting ? "animate-toast-out" : "animate-toast-in"}
              ${colors[t.type]}
              backdrop-blur-lg border rounded-lg px-4 py-3 shadow-2xl
              flex items-center gap-3 text-sm
            `}
          >
            <span className="text-lg">{icons[t.type]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
