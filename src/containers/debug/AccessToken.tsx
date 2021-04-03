import { useAccessToken } from "../../contexts/AccessTokenContext";

const AccessToken = () => {
  const { accessToken } = useAccessToken();
  return <div>AccessToken: {accessToken}</div>;
};

export default AccessToken;
