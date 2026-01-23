'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ThemeContextValue = {
  isLight: boolean;
  changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isLight: true,
  changeTheme: () => {},
});

type ThemeContextProviderProps = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [isLight, setIsLight] = useState(true);

  const changeTheme = useCallback(() => {
    setIsLight((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isLight, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
}

export default ThemeContext;
