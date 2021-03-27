import { FC, ComponentType } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { RouteContext, IRouteComponent } from "../contexts/RouteContext";
import { join } from "path";

const RouteProviderContent: FC = ({ children }) => {
  const makeRoutes = (routes: { [key: string]: IRouteComponent }) => {
    const { url } = useRouteMatch();

    return (
      <Switch>
        {Object.keys(routes).map((key) => {
          const ChildrenComponent = routes[key];

          const ChildrenComponentWrapper: FC = () => {
            const params = useParams();
            return <ChildrenComponent {...params} />;
          };

          return (
            <Route key={key} path={join(url, key)} exact={key === "/"}>
              <ChildrenComponentWrapper />
            </Route>
          );
        })}
        <Route key={404} path="*">
          <div>404</div>
        </Route>
      </Switch>
    );
  };

  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <RouteContext.Provider value={{ makeRoutes, redirect }}>
      {children}
    </RouteContext.Provider>
  );
};

export const RouteProvider: FC = ({ children }) => (
  <BrowserRouter>
    <RouteProviderContent>{children}</RouteProviderContent>
  </BrowserRouter>
);

export const withRoute = <PropsType extends object>(
  Component: ComponentType<PropsType>
): FC<PropsType> => (props: PropsType) => (
  <RouteProvider>
    <Component {...props} />
  </RouteProvider>
);
