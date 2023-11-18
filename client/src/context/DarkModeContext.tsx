import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export type DarkModeOptions = "off" | "on" | "auto";

interface DarkModeContextProps {
  darkMode: DarkModeOptions;
  toggleDarkMode: (value: DarkModeOptions) => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined,
);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useLocalStorageState<DarkModeOptions>(
    "off",
    "darkMode",
  );

  const userSystemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  useEffect(
    function () {
      if (darkMode === "on" || (darkMode === "auto" && userSystemDarkMode)) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [darkMode, userSystemDarkMode],
  );

  function toggleDarkMode(value: DarkModeOptions) {
    setDarkMode(value);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext must be used within a DarkModeProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
