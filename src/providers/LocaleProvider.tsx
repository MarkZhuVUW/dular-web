import { useState, FC, ComponentType } from "react";
import { Locale, LocaleContext } from "../contexts/LocaleContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import LocalStorageKeys from "../constants/LocalStorageKeys";

import enUS from "../locales/en_US.json";
import zhCN from "../locales/zh_CN.json";
import zhTW from "../locales/zh_TW.json";

export const localeMap: { [key: string]: { [key: string]: string } } = {
  [Locale.enUS]: enUS,
  [Locale.zhCN]: zhCN,
  [Locale.zhTW]: zhTW,
};

export const LocaleProvider: FC = ({ children }) => {
  const { getItemOrDefault, setItem } = useLocalStorage();

  const [locale, setLocaleState] = useState(
    getItemOrDefault(LocalStorageKeys.LOCALE, Locale.enUS)
  );

  const setLocale = (locale: Locale) => {
    setItem(LocalStorageKeys.LOCALE, locale);
    setLocaleState(locale);
  };

  const t = (text: string) => localeMap[locale][text];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const withLocale = <PropsType extends object>(
  Component: ComponentType<PropsType>
): FC<PropsType> => (props: PropsType) => (
  <LocaleProvider>
    <Component {...props} />
  </LocaleProvider>
);
