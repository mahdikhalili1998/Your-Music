"use client";

import { ISignupPage, UserInfo } from "@/types/types";
import axios from "axios";
import { regexInfo } from "@/constant/regex";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import ProfilePic from "./ProfilePic";
import { useTranslations } from "next-intl";
import ShowPass from "../element/ShowPass";
import {
  isLengthValid,
  hasUpperCase,
  hasNumber,
  hasSpecialCharacter,
  isEnglishOnly,
} from "@/helper/function";
import isPersian from "@/helper/LanguageRecognizer";

const SignUpInput: FC<ISignupPage> = ({
  image,
  isEditing,
  setImage,
  locale,
  setIsEditing,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    role: "user",
    password: "",
    gender: "",
    profilePicUrl: "",
    creditCardNumber: "",
    bio: "",
    save: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const router = useRouter();
  const {
    name,
    userName,
    email,
    phoneNumber,
    password,
    lastName,
    profilePicUrl,
    creditCardNumber,
    gender,
  } = userInfo;

  const classNames = ` w-[10rem] border-b-2 border-solid border-p-700 bg-transparent py-1 pt-5 ${locale === "fa" ? "mr-4" : "ml-4"} text-center text-p-950 placeholder:text-center placeholder:text-p-950 placeholder:opacity-40 read-only:opacity-65 focus:outline-none md:plaeholder:text-lg`;
  const t = useTranslations("signUpPage");
  const E = useTranslations("enum");
  
  useEffect(() => {
    const userPhone = localStorage.getItem("phoneNumber");
    const userGender = localStorage.getItem("gender");
    setUserInfo({
      ...userInfo,
      phoneNumber: `${userPhone}`,
      gender: `${userGender}`,
    });
  }, []);

  const sendHandler = async () => {
    if (
      !regexInfo.name.test(name) ||
      !regexInfo.email.test(email) ||
      !regexInfo.userName.test(userName) ||
      !regexInfo.password.test(password) ||
      !regexInfo.lastName.test(lastName)
    ) {
      toast(E("Please insert correct Info"));
      return;
    }

    setLoading(true);
    await axios
      .post("/api/auth/sign-up", { userInfo })
      .then((res) => {
        toast.success(res.data.message);
        if (res.status === 200) {
          router.push(`/${locale}/sign-in`);
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 422) {
          toast.error(E("Please insert correct Info"));
        } else if (error.response.status === 409) {
          toast.error(E("There is an account with this email & phone number"));
        } else if (error.response.status === 410) {
          toast.error(E("There is an account with this user name"));
        } else if (error.response.status === 411) {
          toast.error(E("There is an account with this email"));
        } else if (error.response.status === 500) {
          toast.error("Server error , try again later");
        }
        return;
      });
    setLoading(false);
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <ProfilePic
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        image={image}
        setImage={setImage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        locale={locale}
      />
      <div
        className={`${locale === "fa" ? "-mr-5 rounded-bl-full rounded-tl-full pl-24 font-iransans 330:pl-32 330:pr-4 380:pl-36 550:pl-52 550:pr-8 md:rounded-[100%] md:px-64 780:-mr-8 780:px-72" : "-ml-5 rounded-br-full rounded-tr-full pr-28 330:pl-4 330:pr-32 380:pr-36 550:pl-8 550:pr-52 md:rounded-[100%] md:px-64"} ${isEditing && image ? "blur-sm" : null} -mt-6 flex flex-col items-center justify-center gap-5 bg-white py-14 md:mt-6 820:mx-auto 820:rounded-2xl 820:px-36`}
      >
        <input
          className={`${classNames} ${locale === "fa" ? "placeholder:font-iransans" : "placeholder:font-Roboto"} ${regexInfo.name.test(name) ? "focus:border-green-500" : "focus:border-red-700"} ${isPersian(name) ? "font-iransans" : "font-Roboto"}`}
          type="text"
          value={name}
          name="name"
          placeholder={locale === "fa" ? "نام" : "Name"}
          onChange={(e) => changeHandler(e)}
        />

        <input
          className={`${classNames} ${locale === "fa" ? "placeholder:font-iransans" : "placeholder:font-Roboto"} ${regexInfo.lastName.test(lastName) ? "focus:border-green-500" : "focus:border-red-700"} ${isPersian(lastName) ? "font-iransans" : "font-Roboto"} md:placeholder:text-lg`}
          type="text"
          value={lastName}
          name="lastName"
          placeholder={locale === "fa" ? " نام خانوادگی" : "Last Name"}
          onChange={(e) => changeHandler(e)}
        />

        <div>
          <input
            className={`${classNames} ${locale === "fa" ? "placeholder:font-iransans" : "placeholder:font-Roboto"} ${regexInfo.userName.test(userName) ? "focus:border-green-500" : "focus:border-red-700"} ${isPersian(userName) ? "font-iransans" : "font-Roboto"}`}
            type="text"
            value={userName}
            name="userName"
            placeholder={locale === "fa" ? " آیدی" : "User Name"}
            onChange={(e) => changeHandler(e)}
          />
          <ul
            className={`${locale === "fa" ? "mr-8" : "ml-7"} mt-5 list-disc text-sm`}
          >
            <li
              className={`${isEnglishOnly(userName) ? "text-green-600" : "text-gray-400"}`}
            >
              {t("Must be English")}
            </li>
          </ul>
        </div>

        <input
          className={`${classNames} ${regexInfo.email.test(email) ? "focus:border-green-500" : "focus:border-red-700"}`}
          type="email"
          value={email}
          name="email"
          placeholder={locale === "fa" ? " ایمیل" : "Email"}
          onChange={(e) => changeHandler(e)}
        />

        <input
          className={`${classNames}`}
          value={phoneNumber}
          type="number"
          readOnly
        />

        <div className="flex flex-col items-center justify-start">
          <div
            className={`${locale === "fa" ? "mr-2" : "ml-2"} flex items-center`}
          >
            <input
              className={`${classNames} ${regexInfo.password.test(password) ? "focus:border-green-500" : "focus:border-red-700"}`}
              type={showPass ? "text" : "password"}
              value={password}
              name="password"
              placeholder={locale === "fa" ? " رمز عبور" : "Password"}
              onChange={(e) => changeHandler(e)}
            />
            <ShowPass
              showPass={showPass}
              setShowPass={setShowPass}
              locale={locale}
            />
          </div>
          <ul
            className={`${locale === "fa" ? "mr-9" : "ml-8"} mt-5 list-disc space-y-2 text-sm`}
          >
            <li
              className={`${isLengthValid(password) ? "text-green-600" : "text-gray-400"}`}
            >
              {t("8 characters")}
            </li>
            <li
              className={`${hasUpperCase(password) ? "text-green-600" : "text-gray-400"} w-max`}
            >
              {t("Contains uppercase English letter")}
            </li>
            <li
              className={`${hasNumber(password) ? "text-green-600" : "text-gray-400"}`}
            >
              {t("Contains number")}
            </li>
            <li
              className={`${hasSpecialCharacter(password) ? "text-green-600" : "text-gray-400"}`}
            >
              {t("Contains special character")}
            </li>
          </ul>
        </div>
        <div>
          <input
            className={`${classNames} ${regexInfo.creditCard.test(creditCardNumber) ? "focus:border-green-500" : "focus:border-red-700"}`}
            type="text"
            value={creditCardNumber}
            name="creditCardNumber"
            placeholder={
              locale === "fa"
                ? "  شماره کارت (الزامی) "
                : "Credit Card (Mandatory)"
            }
            onChange={(e) => changeHandler(e)}
          />
          <ul className="list-disc">
            <li
              className={`${locale === "fa" ? "mr-4" : "ml-4"} pt-1 text-sm text-gray-400`}
            >
              {t("card")}
            </li>
          </ul>
        </div>

        {loading ? (
          <div className="mx-auto w-max">
            <Loader color="#7e22ce" height={40} width={80} />
          </div>
        ) : (
          <button
            onClick={(e) => sendHandler()}
            className="mt-4 rounded-lg bg-p-700 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-35 sm:px-8 sm:py-2"
            disabled={!name || !userName || !email || !password}
          >
            {t("Send")}
          </button>
        )}
        <Toaster />
      </div>
    </>
  );
};

export default SignUpInput;
