import React, { createContext, SetStateAction, useState } from 'react';

interface ThemeContextType  {
  theme: boolean;
  handleTheme?: () => void;
}
const initialTheme = {
  theme: true,
};

interface ProviderProps {
  children: JSX.Element
}

const ThemeContext = createContext<ThemeContextType>(initialTheme);

const ThemeContextProvider= ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState(initialTheme.theme);
  const handleTheme = () => {
    setTheme(!theme);
  }
  return <ThemeContext.Provider value={{theme, handleTheme}}>{children}</ThemeContext.Provider>;
};

export {ThemeContextProvider}
export default ThemeContext;