import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "'Oxygen'",
      "'Ubuntu'",
      "'Cantarell'",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      "sans-serif",
    ].join(","),
    code: {
      fontFamily: [
        "source-code-pro",
        "Menlo",
        "Monaco",
        "Consolas",
        "'Courier New'",
        "monospace",
      ].join(","),
    },
  },
  overrides: {
    // Add any additional custom styles or overrides here
  },
});

export default theme;
