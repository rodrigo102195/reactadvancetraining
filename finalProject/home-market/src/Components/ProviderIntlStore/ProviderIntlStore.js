import React, {useState} from "react";
import { IntlProvider } from "react-intl";
import i18nConfig from "../../constants/i18nConfig";
import { useSelector } from "react-redux";

const ProviderIntlStore = ({children}) => {
  const [locale, setLocale] = useState("es");
  const language = useSelector(state => state.login.language);

   if (language === "en" && locale !== "en")
     setLocale("en");
   else if (language === "es" && locale !== "es")
    setLocale("es");

  return(
    <IntlProvider locale={locale} messages={i18nConfig.messages[locale]}>
      {children}
    </IntlProvider>
  );
}

export default ProviderIntlStore;