import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1200px",
});

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: (theme) => ({
      body: {
        color: theme.colorMode === "light" ? "black" : "white",
        bg: theme.colorMode === "light" ? "gray.50" : "gray.900",
      },
    }),
  },
  fonts,
  breakpoints,
});
