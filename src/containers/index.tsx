import { makeRoutes } from "contexts/RouteContext";

import Debug from "./debug";

const Home = () => {
  return <div>Home</div>;
};

const App = () =>
  makeRoutes({
    "/": Home,
    "/debug": Debug,
  });

export default App;
