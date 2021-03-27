import { createMuiTheme } from "@material-ui/core/styles";

const dark = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "rgb(33, 33, 33)",
    },
    primary: {
      main: "rgb(51, 51, 51)",
    },
  },
});

export default dark;
