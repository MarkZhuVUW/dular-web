import { FC, useEffect } from "react";
import { useLocale } from "contexts/LocaleContext";

const Title: FC<{ title?: string }> = ({ title }) => {
  const { t } = useLocale();

  const documentTitle = title !== undefined ? title : t("app_name");

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return null;
};

export default Title;
