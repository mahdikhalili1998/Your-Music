"use client";

import { ISignupPage, IUserInfo } from "@/types/types";
import axios from "axios";
import { regexInfo } from "@/constant/regex";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import ProfilePic from "./ProfilePic";
import { useTranslations } from "next-intl";

const SignUpInput: FC<ISignupPage> = ({
  image,
  isEditing,
  setImage,
  locale,
  setIsEditing,
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
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
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { name, userName, email, password, lastName, profilePicUrl, gender } =
    userInfo;
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
        className={`${locale === "fa" ? "font-iransans" : null} ${isEditing && image ? "blur-sm" : null} flex flex-col items-center justify-center gap-5 rounded-br-full rounded-tr-full bg-white py-6 pr-28`}
      >
        {(Object.keys(userInfo) as (keyof IUserInfo)[]).map((key) => (
          <input
            key={key}
            className={`ml-2 w-[10rem] border-b-2 border-solid border-p-700 bg-transparent py-1 pt-3 text-center text-p-950 placeholder:text-center placeholder:text-p-950 placeholder:opacity-40 read-only:opacity-65 focus:outline-none ${(key === "email" && regexInfo.email.test(userInfo[key as keyof IUserInfo])) || (key === "name" && regexInfo.name.test(userInfo[key as keyof IUserInfo])) || (key === "lastName" && regexInfo.lastName.test(userInfo[key as keyof IUserInfo])) || (key === "userName" && regexInfo.userName.test(userInfo[key as keyof IUserInfo])) || (key === "creditCardNumber" && regexInfo.creditCard.test(userInfo[key as keyof IUserInfo])) || (key === "password" && regexInfo.password.test(userInfo[key as keyof IUserInfo])) ? "focus:border-green-500" : "focus:border-red-700"} ${key === "role" || key === "gender" || key === "profilePicUrl" ? "hidden" : null}`}
            value={userInfo[key as keyof IUserInfo]}
            name={key}
            readOnly={key === "phoneNumber"}
            placeholder={key}
            onChange={(e) => changeHandler(e)}
          />
        ))}

        {loading ? (
          <div className="mx-auto w-max">
            <Loader height={40} width={80} />
          </div>
        ) : (
          <button
            onClick={(e) => sendHandler()}
            className="rounded-lg bg-p-700 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
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
