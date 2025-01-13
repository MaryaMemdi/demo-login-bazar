"use client";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { TbBrandInstagram, TbBrandTwitter, TbBrandWhatsapp, TbEyeOff } from "react-icons/tb";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { InputOtp } from 'primereact/inputotp';
import Image from 'next/image';
import "primereact/resources/themes/lara-light-cyan/theme.css?version=2.1";
import useFormValidation from "@/hooks/useFormValidation";

       
const LoginPage = () => {
  // use for chose between mobile and email
  const [chooseButton, setChooseButton] = useState(1);
  // use for phone input 
  const [phone, setPhone] = useState('');
  const [token, setTokens] = useState<number |string| undefined |null>();
//  for checkbox
const [checked, setChecked] = useState(false);
  const {register,handleSubmit,errors,onSubmit} = useFormValidation({
    email:'',
    number:'',
    password:'',
  })
const [showPass,setShowPass] = useState(false);
  const itemsButton = [
    { id: 1, title: "شماره موبایل", type: "mobile" },
    { id: 2, title: "ایمیل", type: "email" },
  ];
  return (
    <div className="flex text-right  dark:text-white text-textColor-primary " dir="rtl">
      <div className="w-[982px]   order-2 justify-between lg:flex flex-col  hidden">
      <div className="w-full m-auto justify-center items-center flex">
        <Image alt="banner" src="icons/frame2.svg" width={554.05} height={554.05} />

      </div>
        <div className="w-full h-[73px] bg-ProjectColor-primary inline-flex justify-start ">
            

            <div className="w-[862px] inline-flex justify-between items-center px-5 pl-[100px] font-YekanBakh text-lg">

          <div className="inline-flex text-white gap-5 h-5">
            <p >پشتیبانی بازار ترکیه</p>
            <p className="border-r border-l px-5">۰۹۳۸ ۵۶۶۳۸۲۹</p>
            <p>۰۹۳۸ ۵۶۶۳۸۲۹</p>
          </div>
          <div className="inline-flex gap-10 text-white text-[23px]">
            <a ><FaTelegramPlane /></a><a><TbBrandInstagram/></a><a><TbBrandWhatsapp/></a><a><TbBrandTwitter/></a></div>
        </div>
            </div>
      </div>
      {/* login */}
      <div className="lg:w-[459px] w-[375px] pt-[46px] pb-8 px-[16.5px]   lg:py-[105.44px] lg:px-[52.5px] gap-4 flex flex-col m-auto lg:m-0">
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
          <div className="w-full h-12 text-ProjectColor-primary bg-ProjectColor-50 inline-flex gap-2.5 justify-start items-center rounded-[5px] px-[5px] pt-2.5">
            <Image alt="lock" src="icons/lock.svg" width={24} height={24}/>
            <p className="text-xs font-YekanBakh"> مطمئن شوید در دامنه <a href="https://bazarturkey.com">https://bazarturkey.com</a> هستید. </p>
          </div>
        </div>
        {/* title */}
        <h3 className="font-YekanBakh text-2xl font-bold ">ورود به بازار ترکیه</h3>
        <div className="w-full justify-between inline-flex font-YekanBakh text-sm">
          <p className=" ">ثبت نام نکرده اید؟</p>
          <a href="#" className="font-bold text-linkColor-primary"> ثبت نام رایگان </a>
        </div>
        {/* form  */}
        <form className="pt-6 gap-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
                    {item.title}
                  </button>
                );
              })}
            </div>
            {chooseButton === 1 ? (
              <div dir="ltr" className="w-full ">

              <PhoneInput
              {...register('number')}
              defaultCountry="tr"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              
              
             
              />
              
              </div>
            ) : (
             
              <input type="email" dir="ltr" placeholder="email" className="h-12 p-4 rounded-md border border-[#E4E4E4] dark:border-[#444852] px-4 py-3 focus:outline-ProjectColor-50 dark:bg-[#25272C] " {...register('email')}/>
              
            
            )}
          </div>
          {chooseButton === 2 &&  errors['email'] && (
                <p className="text-xs text-red-500 font-YekanBakh ">{errors['email']?.message}</p>
              )}
              {chooseButton === 1 && errors['number'] && (
                <p className="text-xs text-red-500 font-YekanBakh ">{errors['number']?.message}</p>
              )}
          {/* password */}
          <div className="flex flex-col gap-2">
            <div className="w-full inline-flex justify-between font-YekanBakh text-sm">
              <label className="">رمز عبور</label>
              <a href="#" className="text-linkColor-primary font-bold">رمز خود را فراموش کرده اید؟</a>
            </div>
            <div
              className="inline-flex w-full justify-start items-center border border-[#E4E4E4] dark:border-[#444852] rounded-md h-[49px] p-5 gap-2 "
              dir="ltr"
            >
              <button onClick={()=>setShowPass(!showPass)} type="button">
              {
                showPass ? <TbEyeOff className="text-2xl text-[#BEBEBE]"/> : <Image alt="eye" src='icons/eye.svg' width={24} height={24}/>
              }
              
              </button>
              
              <input type={`${showPass ? 'text':'password'}`} className="focus:outline-none bg-white dark:bg-[#25272C]" {...register('password')} />
            </div>
              {errors['password'] && (
                <p className="text-xs text-red-500 font-YekanBakh">{errors['password']?.message}</p>
              )}
            
          </div>
          {/* code */}
          <div className="flex flex-col gap-2">
            <div className="w-full inline-flex justify-between font-YekanBakh text-sm">
              <label className="">کد دو عاملی (اختیاری)</label>
              <a href="#" className="text-linkColor-primary font-bold">دسترسی ندارید؟</a>
            </div>
            <div className=" flex flex-row justify-content-center  w-full   h-[49px] justify-center items-center  " dir="ltr">

            <InputOtp value={token} onChange={(e) => setTokens(e.value)}  length={6}  integerOnly  />
            </div>
          </div>
          {/* remember me */}
          <div className="inline-flex gap-2 items-center">
            <input type="checkbox" checked={checked} onChange={()=> setChecked(!checked)} className="" style={{ width: '24px',height:'24px',border:'1px solid #D2D5DA',borderRadius:'4px',borderColor:'#D2D5DA'}}/>
            <button type="button" className=" text-sm po"  onClick={()=>setChecked(!checked)}>مرا بخاطر بسپار</button>
          </div>
            <button type="submit" className="bg-ProjectColor-primary text-white w-full h-[49px] rounded-md">ورود</button>
        </form>
          <div className="w-full flex flex-col gap-2 font-YekanBakh -mt-2">
            <button className="bg-[#F6F6F6] text-black w-full h-[49px] rounded-md inline-flex justify-center items-center gap-2"><Image width={20} height={20} alt="" src='icons/google.svg'/><p >ورود سریع با گوگل</p></button>
            <div className="flex w-full justify-center gap-2">
              <button className="bg-[#3477E8] text-white w-[172.5px] h-[49px] rounded-md inline-flex justify-center items-center gap-2"><Image width={20} height={20} alt="" src="icons/facebook.svg" className="text-white"/><p >ورود با فیسبوک</p></button>
              <button className="bg-[#383A40] text-white w-[172.5px] h-[49px] rounded-md inline-flex justify-center items-center gap-2"><Image width={20} height={20} alt="" src='icons/apple.svg'/><p>ورود با اپل</p></button>
            </div>
          </div>
      </div>
    </div>
  );
};
export default LoginPage;
