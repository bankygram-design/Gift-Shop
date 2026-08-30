"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { StoreSettings } from "./store-settings";

const StoreSettingsContext = createContext<StoreSettings | undefined>(undefined);

export function StoreSettingsProvider({
  settings,
  children,
}: {
  settings: StoreSettings;
  children: ReactNode;
}) {
  return (
    <StoreSettingsContext.Provider value={settings}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings(): StoreSettings {
  const ctx = useContext(StoreSettingsContext);
  if (!ctx) {
    throw new Error("useStoreSettings must be used within a StoreSettingsProvider");
  }
  return ctx;
}
