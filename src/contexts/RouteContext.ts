import { createContext, useContext, ReactElement } from "react";

export type RouteParams = {
  [key: string]: string;
};

export interface IRouteComponent {
  (params: RouteParams): ReactElement | null;
}

export type RouteContextType = {
  makeRoutes: (routes: {
    [key: string]: IRouteComponent;
  }) => ReactElement | null;
  redirect: (path: string) => void;
};

export const RouteContext = createContext<RouteContextType>({
  makeRoutes: (routes: { [key: string]: IRouteComponent }) => {
    console.warn(`Failed to make routes, no route provider`);
    console.debug("routes", routes);
    return null;
  },
  redirect: (path: string) => {
    console.warn(`Failed to redirect to ${path}, no route provider`);
  },
});

export const useRoute = () => useContext(RouteContext);

export const makeRoutes = (routes: { [key: string]: IRouteComponent }) =>
  useRoute().makeRoutes(routes);
