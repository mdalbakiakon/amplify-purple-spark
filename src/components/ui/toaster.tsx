import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`
              group pointer-events-auto relative flex w-[calc(100vw-20px)] max-w-[300px] 
              items-start justify-between overflow-hidden rounded-md border p-3 pr-6
              shadow-lg transition-all
              text-left
              mx-auto  // Centers toast on smallest screens
              sm:w-full sm:max-w-[350px]  // Slightly wider on larger devices
              md:absolute md:bottom-2 md:right-2
            `}
          >
            <div className="flex-1 grid gap-1 min-w-0">  {/* min-w-0 prevents overflow */}
              {title && (
                <ToastTitle className="text-xs font-medium line-clamp-1 sm:text-sm">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-[11px] leading-tight line-clamp-2 sm:text-xs">
                  {description}
                </ToastDescription>
              )}
            </div>
            <ToastClose className="
              absolute right-1 top-1 p-0.5
              sm:right-2 sm:top-2
            " />
            {action}
          </Toast>
        );
      })}
      <ToastViewport className="
        fixed bottom-0 left-0 z-[100] flex flex-col-reverse p-2
        items-center  // Centers on small screens
        sm:items-end sm:left-auto sm:right-0 sm:top-auto sm:bottom-0
      " />
    </ToastProvider>
  );
}