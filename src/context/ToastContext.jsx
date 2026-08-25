import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const ToastCtx = createContext({
  push: () => {},
});

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((type, msg) => {
    const id = Date.now() + Math.random();

    setToasts((t) => [
      ...t,
      {
        id,
        type,
        msg,
      },
    ]);

    setTimeout(() => {
      setToasts((t) =>
        t.filter((x) => x.id !== id)
      );
    }, 4000);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}

      <div className="toasts">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${
              t.type === "error"
                ? "t-err"
                : t.type === "info"
                ? "t-info"
                : ""
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 />
            ) : t.type === "error" ? (
              <AlertCircle />
            ) : (
              <Info />
            )}

            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}