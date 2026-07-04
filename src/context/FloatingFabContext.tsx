import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

type FloatingFabMode = "call" | "order";

type FloatingFabContextValue = {
  mode: FloatingFabMode;
};

const FloatingFabContext = createContext<FloatingFabContextValue | undefined>(
  undefined,
);

export function FloatingFabProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const value = useMemo<FloatingFabContextValue>(
    () => ({
      mode: location.pathname === "/menu" ? "order" : "call",
    }),
    [location.pathname],
  );

  return (
    <FloatingFabContext.Provider value={value}>
      {children}
    </FloatingFabContext.Provider>
  );
}

export function useFloatingFab() {
  const context = useContext(FloatingFabContext);

  if (!context) {
    throw new Error("useFloatingFab must be used within a FloatingFabProvider");
  }

  return context;
}
