import { useState, useEffect, FC, ComponentType } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DefaultLoading } from "../components/common/Loading";
import { ErrorMessage } from "../components/common/Message";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import LocalStorageKeys from "../constants/LocalStorageKeys";

type FetchAccessTokenResult = {
  accessToken?: string;
  errorMessage?: string;
};

const FetchAccessToken: FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [result, setResult] = useState<FetchAccessTokenResult | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        setResult({ accessToken });
      } catch (e) {
        console.error(`Failed to get access token silently, ${e.message}`);
        setResult({
          errorMessage: e.message,
        });
      }
    };

    if (result === null) {
      fetchAccessToken();
    }
  });

  if (result === null) {
    return <DefaultLoading />;
  }

  if (result.errorMessage) {
    return <ErrorMessage message={result.errorMessage as string} />;
  }

  return (
    <AccessTokenContext.Provider
      value={{ accessToken: result.accessToken as string }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};

const AccessTokenProvider: FC = ({ children }) => {
  const localStorage = useLocalStorage();

  const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <DefaultLoading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!isAuthenticated) {
    console.log(`Perform login with redirect from ${window.location.href}`);
    localStorage.setItem(
      LocalStorageKeys.AUTH0_CALLBACK_URL,
      window.location.href
    );
    loginWithRedirect({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    return <DefaultLoading />;
  }

  return <FetchAccessToken>{children}</FetchAccessToken>;
};

export const withAccessToken = <PropsType extends object>(
  Component: ComponentType<PropsType>
): FC<PropsType> => (props: PropsType) => (
  <AccessTokenProvider>
    <Component {...props} />
  </AccessTokenProvider>
);
