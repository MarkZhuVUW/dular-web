import { render } from "react-dom";
import { flowRight } from "lodash";
import { withLocalStorage } from "providers/LocalStorageProvider";
import { withLocale } from "providers/LocaleProvider";
import { withTheme } from "providers/ThemeProvider";
import { withRoute } from "providers/RouteProvider";

import Containers from "containers";

const App = flowRight(
  withLocalStorage,
  withLocale,
  withTheme,
  withRoute
)(Containers);

render(<App />, document.getElementById("root"));
