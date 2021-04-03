import { FC, ComponentType } from "react";
import { Auth0Provider as Auth0ProviderInternal } from "@auth0/auth0-react";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import LocalStorageKeys from "../constants/LocalStorageKeys";

export const Auth0Provider: FC = ({ children }) => {
  const localStorage = useLocalStorage();

  const handleRedirectCallback = () => {
    const callbackUrl = localStorage.getItem(
      LocalStorageKeys.AUTH0_CALLBACK_URL
    );

    if (callbackUrl !== null) {
      console.info(
        `Auth0 callback URL detected, redirecting to ${callbackUrl}`
      );
      localStorage.removeItem(LocalStorageKeys.AUTH0_CALLBACK_URL);
      window.location.assign(callbackUrl);
    }
  };

  return (
    <Auth0ProviderInternal
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
      onRedirectCallback={handleRedirectCallback}
    >
      {children}
    </Auth0ProviderInternal>
  );
};

export const withAuth0 = <PropsType extends object>(
  Component: ComponentType<PropsType>
): FC<PropsType> => (props: PropsType) => (
  <Auth0Provider>
    <Component {...props} />
  </Auth0Provider>
);
