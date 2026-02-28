'use client';

// 토스트 알림 컴포넌트 - 성공/에러 알림, 3초 후 자동 사라짐
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastItemProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 직후 페이드인
    const showTimer = setTimeout(() => setVisible(true), 10);

    // 2.7초 후 페이드아웃 시작
    const hideTimer = setTimeout(() => setVisible(false), 2700);

    // 3초 후 제거
    const removeTimer = setTimeout(() => onRemove(toast.id), 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onRemove]);

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={[
        'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium',
        'transition-all duration-300',
        isSuccess ? 'bg-emerald-500' : 'bg-red-500',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      ].join(' ')}
    >
      <span className="shrink-0">
        {isSuccess ? <Check size={16} /> : <X size={16} />}
      </span>
      <span>{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// 토스트 상태 훅
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  function showToast(message: string, type: ToastType = 'success') {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, showToast, removeToast };
}
