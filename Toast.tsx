import React from 'react';
import { CheckCircle2, Flame, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-3.5 rounded-2xl bg-neutral-900/95 border border-orange-500/40 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : (
              <Flame className="w-5 h-5 text-orange-400" />
            )}
          </div>

          <div className="flex-1 pr-2">
            <div className="text-xs font-bold text-white">{toast.title}</div>
            {toast.description && (
              <div className="text-[11px] text-neutral-400 mt-0.5">{toast.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
