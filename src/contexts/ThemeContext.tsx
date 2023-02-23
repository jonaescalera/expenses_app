import React, { createContext, useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../modes/variables";

interface Theme {
  background: string;
  colour: string;
}

interface Styles {
  container: object

}

interface Context {
  theme: Theme
  styles: Styles
  isDarkMode: boolean,
  setDarkMode: (value: boolean) => void,
}


const defaultTheme: Theme = colors.light;
const defaultStyles: Styles ={
  container:{
    flex: 1,
    backgroundColor: colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  }
}

const ThemeContext = createContext<Context>({
  theme: defaultTheme,
  styles: defaultStyles,
  isDarkMode: false,
  setDarkMode: () => {}
});

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setDarkMode] = useState(false)

  const theme = isDarkMode ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
    }
  });

  return(
    <ThemeContext.Provider value={{theme, styles, isDarkMode, setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
}


export {ThemeContext, ThemeProvider};