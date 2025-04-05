"use client";
import { useState, useEffect } from "react";
import { FaTelegramPlane, FaSun, FaMoon } from "react-icons/fa";
import {
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandWhatsapp,
  TbEyeOff,
} from "react-icons/tb";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { InputOtp } from "primereact/inputotp";
import Image from "next/image";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css?version=2.1";
import useFormValidation from "@/hooks/useFormValidation";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";
import flagIran from "../../public/icons/flags/iran (1).svg";
import flagGermany from "../../public/icons/flags/germany.svg";
import flagUSA from "../../public/icons/flags/united-states.svg";

const LoginPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [chooseButton, setChooseButton] = useState(1);
  const [phone, setPhone] = useState("");
  const [token, setTokens] = useState<number | string | undefined | null>();
  const [focusIndex, setFocusIndex] = useState<null | number>(null);
  const [checked, setChecked] = useState(false);
  const { register, handleSubmit, errors, onSubmit } = useFormValidation({
    email: "",
    number: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const itemsButton = [
    { id: 1, title: "phone", type: "mobile" },
    { id: 2, title: "email", type: "email" },
  ];

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleFocus = (index: number) => {
    setFocusIndex(index);
  };
  const handleBlur = () => {
    setFocusIndex(null);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const showFlag = (language: string) => {
    switch (language) {
      case "fa":
        return <Image src={flagIran} alt="flag iran" className="w-5 h-5" />;
      case "en":
        return <Image src={flagUSA} alt="flag usa" className="w-5 h-5" />;
      case "de":
        return (
          <Image src={flagGermany} alt="flag germany" className="w-5 h-5" />
        );
      default:
        return <Image src={flagIran} alt="flag iran" className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`flex text-right ${
        theme === "dark" ? "dark" : ""
      } dark:text-white text-textColor-primary`}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "dark" ? <FaMoon className="text-xl"/> : <FaSun className="text-gray-400 text-xl" />}
      </button>
      
      <button className="language-toggle-button" onClick={toggleDropdown}>
        {showFlag(language)}
      </button>
      <div className={` flex flex-col gap-1 absolute top-10 right-[51px] bg-gray-300 dark:bg-gray-600 p-2 rounded-lg  ease-linear duration-75 animate-none   ${dropdownOpen ? "show" : "hidden"}`}>
        <button
          onClick={() => {
            setLanguage("fa");
            setDropdownOpen(false);
          }}
        >
          <Image src={flagIran} alt="flag iran" className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setLanguage("en");
            setDropdownOpen(false);
          }}
        >
          <Image src={flagUSA} alt="flag usa" className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setLanguage("de");
            setDropdownOpen(false);
          }}
        >
          <Image src={flagGermany} alt="flag germany" className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full   order-2 justify-between lg:flex flex-col  hidden">
        <div className="w-full m-auto justify-center items-center flex">
          <Image
            alt="banner"
            src="icons/frame2.svg"
            width={554.05}
            height={554.05}
          />
        </div>
      </div>
      {/* login */}
      <div className="lg:w-[459px] w-[375px] top-0  pb-8 px-[16.5px] dark:bg-[#25272C] bg-white lg:py-[105.44px] lg:px-[52.5px] gap-4 flex flex-col m-auto lg:m-0">
        {/* frame*/}
        <div className="flex flex-col gap-4">
          <Image
            alt="logo"
            src="icons/logo.svg"
            width={354}
            height={162.12}
            className="dark:hidden"
          />
          <Image
            alt="logo"
            src="icons/logodark.svg"
            width={354}
            height={162.12}
            className="dark:block hidden"
          />
          <div className="w-full h-12 text-ProjectColor-primary bg-ProjectColor-50 inline-flex gap-2.5 justify-cenetr items-center rounded-[5px]  px-[5px]">
            <Image
              alt="lock"
              src="icons/lock.svg"
              width={24}
              height={24}
              className="pb-1"
            />
            <p className="text-xs font-YekanBakh">
              {t("ensureDomain")}
              <a href={t("domain")}>{t("domain")}</a>{" "}
            </p>
          </div>
        </div>
        {/* title */}
        <h3 className="font-YekanBakh text-2xl font-bold ">
          {t("loginTitle")}
        </h3>
        <div className="w-full justify-between inline-flex font-YekanBakh text-sm">
          <p className=" ">{t("notRegistered")}</p>
          <a href="#" className="font-bold text-linkColor-primary">
            {t("freeRegister")}
          </a>
        </div>
        {/* form  */}
        <form
          className="pt-6 gap-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* button email and phone */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between gap-2">
              {itemsButton.map((item) => {
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`${
                      chooseButton === item.id
                        ? "text-ProjectColor-primary bg-ProjectColor-50 border-none"
                        : " border-[#E4E4E4] dark:border-[#444852]"
                    } w-[173px] h-11 rounded-[5px] p-[5px] border font-YekanBakh text-sm `}
                    onClick={() => setChooseButton(item.id)}
                  >
                    {t(item.title)}
                  </button>
                );
              })}
            </div>
            {chooseButton === 1 ? (
              <div
                dir="ltr"
                className={`w-full ${
                  focusIndex === 3 && "border-linkColor-primary"
                }`}
                id={`${focusIndex === 3 && "activ"}`}
              >
                <PhoneInput
                  {...register("number")}
                  className='phone'
                  defaultCountry="tr"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  onFocus={() => handleFocus(3)}
                />
              </div>
            ) : (
              <input
                type="email"
                dir="ltr"
                placeholder={t("email")}
                className="h-12 p-4 rounded-md border border-[#E4E4E4] dark:border-[#444852] px-4 py-3 focus:outline-linkColor-primary  dark:bg-[#25272C] bg-transparent dark:focus:outline-white "
                {...register("email")}
              />
            )}
          </div>
          {chooseButton === 2 && errors["email"] && (
            <p className="text-xs text-red-500 font-YekanBakh ">
              {errors["email"]?.message}
            </p>
          )}
          {chooseButton === 1 && errors["number"] && (
            <p className="text-xs text-red-500 font-YekanBakh ">
              {errors["number"]?.message}
            </p>
          )}
          {/* password */}
          <div className="flex flex-col gap-2">
            <div className="w-full inline-flex justify-between font-YekanBakh text-sm">
              <label className="">{t("password")}</label>
              <a href="#" className="text-linkColor-primary font-bold">
                {t("forgotPassword")}
              </a>
            </div>
            <div
              className={`inline-flex w-full justify-start items-center border border-[#E4E4E4] dark:border-[#444852] rounded-md h-[49px] p-5 gap-2 dark:hover:border-white hover:border-linkColor-primary hover:border-2 ${
                focusIndex == 2 &&
                "border-linkColor-primary border-2 dark:border-white"
              }`}
              dir="ltr"
            >
              <button onClick={() => setShowPass(!showPass)} type="button">
                {showPass ? (
                  <TbEyeOff className="text-2xl text-[#BEBEBE]" />
                ) : (
                  <Image alt="eye" src="icons/eye.svg" width={24} height={24} />
                )}
              </button>

              <input
                type={`${showPass ? "text" : "password"}`}
                className="focus:outline-none bg-white dark:bg-[#25272C] w-full "
                {...register("password")}
                onFocus={() => handleFocus(2)}
                onBlur={handleBlur}
              />
            </div>
            {errors["password"] && (
              <p className="text-xs text-red-500 font-YekanBakh">
                {errors["password"]?.message}
              </p>
            )}
          </div>
          {/* code */}
          <div className="flex flex-col gap-2">
            <div className="w-full inline-flex justify-between font-YekanBakh text-sm">
              <label className="">{t("twoFactorCode")}</label>
              <a href="#" className="text-linkColor-primary font-bold">
                {t("noAccess")}
              </a>
            </div>
            <div
              className=" flex flex-row justify-content-center  w-full   h-[49px] justify-center items-center  "
              dir="ltr"
            >
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value)}
                length={6}
              />
            </div>
          </div>
          {/* remember me */}
          <div className="inline-flex gap-2 items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className=""
              style={{
                width: "24px",
                height: "24px",
                border: "1px solid #D2D5DA",
                borderRadius: "4px",
                borderColor: "#D2D5DA",
              }}
            />
            <button
              type="button"
              className=" text-sm po"
              onClick={() => setChecked(!checked)}
            >
              {t("rememberMe")}
            </button>
          </div>
          <button
            type="submit"
            className="bg-ProjectColor-primary text-white w-full h-[49px] rounded-md"
          >
            {t("login")}
          </button>
        </form>
        <div className="w-full flex flex-col gap-2 font-YekanBakh -mt-2 mb-10 md:-mb-10">
          <button className="bg-[#F6F6F6] text-black w-full h-[49px] rounded-md inline-flex justify-center items-center gap-2">
            <Image width={20} height={20} alt="" src="icons/google.svg" />
            <p>{t("quickLoginGoogle")}</p>
          </button>
          <div className="flex w-full justify-center gap-2">
            <button className="bg-[#3477E8] text-white w-[172.5px] h-[49px] rounded-md inline-flex justify-center items-center gap-2">
              <Image
                width={20}
                height={20}
                alt=""
                src="icons/facebook.svg"
                className="text-white"
              />
              <p>{t("loginWithFacebook")}</p>
            </button>
            <button className="bg-[#383A40] text-white w-[172.5px] h-[49px] rounded-md inline-flex justify-center items-center gap-2">
              <Image width={20} height={20} alt="" src="icons/apple.svg" />
              <p>{t("loginWithApple")}</p>
            </button>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="fixed bottom-0 w-full h-auto p-1 md:p-4 bg-ProjectColor-primary flex justify-center items-center">
        <div className="w-full max-w-[1200px] flex md:justify-between items-center px-5 font-YekanBakh text-lg flex-col gap-2 md:flex-row justify-center ">
          <div className="flex text-white gap-1 text-sm md:text-base lg:text-lg w-full justify-center md:justify-start">
            <p>{t("support")}</p>
            <p className="border-r border-l px-2">۰۹۳۸ ۵۶۶۳۸۲۹</p>
            <p>۰۹۳۸ ۵۶۶۳۸۲۹</p>
          </div>
          <div className="flex gap-10 text-white text-[23px]">
            <a>
              <FaTelegramPlane />
            </a>
            <a>
              <TbBrandInstagram />
            </a>
            <a>
              <TbBrandWhatsapp />
            </a>
            <a>
              <TbBrandTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
