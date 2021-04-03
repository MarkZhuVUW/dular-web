import { createContext, useContext } from "react";

export type AccessTokenContextType = {
  accessToken: string | null;
};

export const AccessTokenContext = createContext<AccessTokenContextType>({
  accessToken: null,
});

export const useAccessToken = () => useContext(AccessTokenContext);
