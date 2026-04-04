import type { Toast } from "~/types/shared-components/toast";

const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.value.push({ ...toast, id });

    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const success = (title: string, message?: string, duration?: number) =>
    addToast({ title, message, type: "success", duration });
  const error = (title: string, message?: string, duration?: number) =>
    addToast({ title, message, type: "error", duration });
  const info = (title: string, message?: string, duration?: number) =>
    addToast({ title, message, type: "info", duration });
  const warning = (title: string, message?: string, duration?: number) =>
    addToast({ title, message, type: "warning", duration });

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};
