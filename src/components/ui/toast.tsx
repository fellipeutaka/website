"use client";

import { Toast } from "@base-ui/react/toast";
import { useEffect, useRef } from "react";

const toastManager = Toast.createToastManager();

export const toast = {
  success: (title: React.ReactNode) =>
    toastManager.add({ title, type: "success" }),
  error: (title: React.ReactNode) =>
    toastManager.add({ title, type: "error", priority: "high" }),
  warning: (title: React.ReactNode) =>
    toastManager.add({ title, type: "warning" }),
};

const iconPaths = {
  success:
    "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  error:
    "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  warning:
    "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
};

function getIconPath(type: string | undefined) {
  if (type === "error") {
    return iconPaths.error;
  }
  if (type === "warning") {
    return iconPaths.warning;
  }
  return iconPaths.success;
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function focusNotifications(event: KeyboardEvent) {
      if (event.altKey && event.code === "KeyT") {
        event.preventDefault();
        viewportRef.current?.focus();
      }
    }
    document.addEventListener("keydown", focusNotifications);
    return () => {
      document.removeEventListener("keydown", focusNotifications);
    };
  }, []);
  return (
    <Toast.Portal>
      <Toast.Viewport
        aria-label="Notifications alt+T"
        className="toast-viewport"
        ref={viewportRef}
        tabIndex={-1}
      >
        {toasts.map((notification) => (
          <Toast.Root
            className="toast-root"
            key={notification.id}
            toast={notification}
          >
            <Toast.Content className="flex items-center gap-1.5">
              <svg
                aria-hidden="true"
                className="mr-px -ml-1 shrink-0"
                fill="currentColor"
                height="20"
                viewBox={
                  notification.type === "warning" ? "0 0 24 24" : "0 0 20 20"
                }
                width="20"
              >
                <path
                  clipRule="evenodd"
                  d={getIconPath(notification.type)}
                  fillRule="evenodd"
                />
              </svg>
              <div className="flex flex-col gap-0.5">
                <Toast.Title className="leading-normal font-medium" />
                <Toast.Description className="leading-[1.4] text-[#3f3f3f]" />
              </div>
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function Toaster() {
  return (
    <Toast.Provider limit={3} timeout={4000} toastManager={toastManager}>
      <ToastList />
    </Toast.Provider>
  );
}
