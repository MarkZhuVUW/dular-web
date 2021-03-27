import { makeRoutes } from "contexts/RouteContext";
import { DefaultLayout } from "components/common/Layout";
import LocaleDebug from "./LocaleDebug";
import LocalStorageDebug from "./LocalStorageDebug";
import StorageIcon from "@material-ui/icons/Storage";
import HomeIcon from "@material-ui/icons/Home";
import TranslateIcon from "@material-ui/icons/Translate";
import { useLocale } from "contexts/LocaleContext";

const DebugContent = () =>
  makeRoutes({
    "/locale": LocaleDebug,
    "/local-storage": LocalStorageDebug,
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
  ];

  return (
    <DefaultLayout title="debug" menuItems={menuItems}>
      <DebugContent />
    </DefaultLayout>
  );
};

export default Debug;
