import { makeRoutes } from "contexts/RouteContext";
import { DefaultLayout } from "components/common/Layout";
import StorageIcon from "@material-ui/icons/Storage";

import HomeIcon from "@material-ui/icons/Home";
import TranslateIcon from "@material-ui/icons/Translate";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useLocale } from "contexts/LocaleContext";
import { withAccessToken } from "providers/AccessTokenProvider";

import LocaleDebug from "./LocaleDebug";
import LocalStorageDebug from "./LocalStorageDebug";
import AccessToken from "./AccessToken";

const DebugContent = () =>
  makeRoutes({
    "/locale": LocaleDebug,
    "/local-storage": LocalStorageDebug,
    "/access-token": AccessToken,
  });

const Debug = () => {
  const { t } = useLocale();

  const menuItems = [
    {
      path: "/",
      title: "Home",
      icon: <HomeIcon />,
    },
    {
      path: "/debug/local-storage",
      title: t("local_storage_data"),
      icon: <StorageIcon />,
    },
    {
      path: "/debug/locale",
      title: t("locale_data"),
      icon: <TranslateIcon />,
    },
    {
      path: "/debug/access-token",
      title: t("access_token"),
      icon: <VpnKeyIcon />,
    },
  ];

  return (
    <DefaultLayout title="debug" menuItems={menuItems}>
      <DebugContent />
    </DefaultLayout>
  );
};

const DebugWithAccessToken = withAccessToken(Debug);

export default DebugWithAccessToken;
