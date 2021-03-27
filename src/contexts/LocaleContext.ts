import { createContext, useContext } from "react";

export enum Locale {
  enUS = "en_US",
  zhCN = "zh_CN",
  zhTW = "zh_TW",
}

export type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: string) => string;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: Locale.enUS,
  setLocale: (locale) => {
    console.warn(`Failed to set locale = ${locale}, no locale provider`);
  },
  t: (text) => {
    console.warn(`Failed to translate text = ${text}, no locale provider`);
    return text;
  },
});

export const useLocale = () => useContext(LocaleContext);
