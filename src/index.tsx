import { render } from "react-dom";
import { flowRight } from "lodash";
import { withLocalStorage } from "providers/LocalStorageProvider";
import { withLocale } from "providers/LocaleProvider";
import { withTheme } from "providers/ThemeProvider";
import { withRoute } from "providers/RouteProvider";
import { withAuth0 } from "providers/Auth0Provider";

import Containers from "containers";

const App = flowRight(
  withLocalStorage,
  withLocale,
  withTheme,
  withAuth0,
  withRoute
)(Containers);

render(<App />, document.getElementById("root"));
