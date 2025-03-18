"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import flagIran from "../../../public/icons/flags/iran (1).svg";
import flagGermany from "../../../public/icons/flags/germany.svg";
import flagUSA from "../../../public/icons/flags/united-states.svg";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  fa: {
    support: "پشتیبانی بازار ترکیه",
    phone: "شماره موبایل",
    email: "ایمیل",
    notRegistered: "ثبت نام نکرده اید؟",
    freeRegister: "ثبت نام رایگان",
    loginTitle: "ورود به بازار ترکیه",
    password: "رمز عبور",
    forgotPassword: "رمز خود را فراموش کرده اید؟",
    twoFactorCode: "کد دو عاملی (اختیاری)",
    noAccess: "دسترسی ندارید؟",
    rememberMe: "مرا بخاطر بسپار",
    login: "ورود",
    quickLoginGoogle: "ورود سریع با گوگل",
    loginWithFacebook: "ورود با فیسبوک",
    loginWithApple: "ورود با اپل",
    ensureDomain: " مطمئن شوید در دامنه ",
    domain: "https://bazarturkey.com",
  },
  en: {
    support: "Turkey Market Support",
    phone: "Phone Number",
    email: "Email",
    notRegistered: "Not registered?",
    freeRegister: "Free Register",
    loginTitle: "Login to Turkey Market",
    password: "Password",
    forgotPassword: "Forgot your password?",
    twoFactorCode: "Two-Factor Code (Optional)",
    noAccess: "No access?",
    rememberMe: "Remember me",
    login: "Login",
    quickLoginGoogle: "Quick Login with Google",
    loginWithFacebook: "Login with Facebook",
    loginWithApple: "Login with Apple",
    ensureDomain: " Ensure you are on the domain ",
    domain: "https://bazarturkey.com",
  },
  de: {
    support: "Türkei Markt Unterstützung",
    phone: "Telefonnummer",
    email: "Email",
    notRegistered: "Nicht registriert?",
    freeRegister: "Kostenlose Registrierung",
    loginTitle: "Anmeldung zum Türkei Markt",
    password: "Passwort",
    forgotPassword: "Passwort vergessen?",
    twoFactorCode: "Zwei-Faktor-Code (Optional)",
    noAccess: "Kein Zugang?",
    rememberMe: "Erinnere dich an mich",
    login: "Anmeldung",
    quickLoginGoogle: "Schnell anmelden mit Google",
    loginWithFacebook: "Mit Facebook anmelden",
    loginWithApple: "Mit Apple anmelden",
    ensureDomain: " Stellen Sie sicher, dass Sie sich auf der Domain befinden ",
    domain: "https://bazarturkey.com",
  },
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  flag: string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "fa";
    }
    return "fa";
  });

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("lang", lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const flag =
    language === "fa" ? flagIran : language === "en" ? flagUSA : flagGermany;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, t, flag }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
