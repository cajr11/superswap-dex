import React from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  isLight: true,
  changeTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps): JSX.Element => {
  const [isLight, setIsLight] = React.useState(true);

  const changeThemeHandler = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeContext.Provider value={{ isLight: isLight, changeTheme: changeThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
