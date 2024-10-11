"use client";
import { ILoginInfo } from "@/types/editProfileDetail";
import { IProfileDetail } from "@/types/props";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import Link from "next/link";
import { useTranslations } from "next-intl";
import momentJalaali from "moment-jalaali";
import { p2e } from "@/helper/replaceNumber.js";
import { truncateText } from "@/helper/function";

const LoginInfo: FC<IProfileDetail> = ({
  openPersonalModal,
  userData,
  locale,
  setIsBlur,
  isBlur,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [passLevel, setPassLevel] = useState<boolean>(false);
  const [editedInfo, setEditedInfo] = useState<ILoginInfo>({
    email: userData.email,
    userName: userData.userName,
    updatedAt: moment().format("YYYY/MM/DD HH:mm:ss"),
    _id: userData._id,
  });
  const [changingOption, setChangingOption] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const t = useTranslations("loginInfo");
  momentJalaali.loadPersian({ usePersianDigits: true });
  const jalaliDate = momentJalaali(userData.updatedAt).format("jYYYY/jMM/jDD");
  const router = useRouter();
  const inputRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setPassLevel(false);
        setIsBlur(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const editInfohandler = (name: string) => {
    setChangingOption(name);
    setEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const saveHandler = async () => {
    setPassLevel(true);
    setIsBlur(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    setPassword("");
  };

  const finalSaveHander = async () => {
    setLoader(true);
    await axios
      .patch("/api/edit-info/login", { editedInfo, password })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          toast.success(t("Succsess"));
          router.refresh();
          router.push(`/${locale}/sign-in`);
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 409) {
          toast.error(t("You have not made any changes"));
        } else if (error.response.status === 401) {
          toast.error(t("wrong password"));
        } else if (error.response.status === 422) {
          toast.error(t("Please insert correct Info"));
        } else if (error.response.status === 404) {
          toast.error(t("user not found"));
        } else if (error.response.status === 500) {
          toast.error(t("server error , try again later"));
        }
      });
    setPassLevel(false);
    setIsBlur(false);
    setLoader(false);
    router.refresh();
  };

  return (
    <div
      className={`relative ${!openPersonalModal ? "-z-10 h-0 -translate-y-24 opacity-0" : "z-10 h-auto translate-y-3 opacity-100"} transition-all duration-700`}
    >
      <ul
        className={`${passLevel ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} flex flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-p-200 to-p-300 p-2 text-p-950 ${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"}`}
      >
        <li onClick={(e) => editInfohandler("email")}>
          {changingOption === "email" && edit ? (
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium text-rose-800">{t("Email")}: </span>{" "}
              <input
                className="rounded-xl bg-transparent px-2 py-1 text-center text-p-950 focus:border-4 focus:border-solid focus:border-p-500 focus:outline-4 focus:outline-white sm:w-[8rem]"
                ref={inputRef}
                type="text"
                name="email"
                value={edit ? editedInfo.email : userData.email}
                onChange={(e) => changeHandler(e)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium text-rose-800">{t("Email")} : </span>
              <span>
                {edit ? editedInfo.email : truncateText(userData.email)}
              </span>
            </div>
          )}
        </li>
        <li onClick={(e) => editInfohandler("userName")}>
          {changingOption === "userName" && edit ? (
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium text-rose-800">
                {t("userName")} :{" "}
              </span>{" "}
              <input
                className="rounded-xl bg-transparent px-2 py-1 text-center text-p-950 focus:border-4 focus:border-solid focus:border-p-500 focus:outline-4 focus:outline-white sm:w-[8rem]"
                ref={inputRef}
                type="text"
                name="userName"
                value={edit ? editedInfo.userName : userData.userName}
                onChange={(e) => changeHandler(e)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium text-rose-800">
                {" "}
                {t("userName")} :{" "}
              </span>
              <span>{edit ? editedInfo.userName : userData.userName}</span>
            </div>
          )}
        </li>
        <li className="flex flex-col items-center justify-center">
          <span className="font-medium text-rose-800">
            {" "}
            {t("Last Update Date")}:{" "}
          </span>
          <span>
            {locale === "fa"
              ? jalaliDate
              : p2e(moment(userData.updatedAt).format("YYYY/MM/DD"))}
          </span>
        </li>
        {edit ? (
          <button
            onClick={(e) => saveHandler()}
            className="rounded-lg border-2 border-solid border-white bg-green-500 px-2 py-1 font-medium text-white outline outline-[3px] outline-green-500"
          >
            {t("Save")}
          </button>
        ) : null}
      </ul>
      {passLevel ? (
        <div
          ref={divRef}
          className="absolute left-[12%] top-[10%] z-20 flex w-3/4 flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 sm:w-[12rem]"
        >
          <h2 className="text-center text-sm font-medium">
            {t("Enter your password to continue")} :
          </h2>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            ref={inputRef}
            className="w-[90%] rounded-xl border-2 border-solid border-p-700 bg-transparent px-2 py-1 text-center text-p-950 outline-4 outline-white focus:outline-none"
          />
          {loader ? (
            <div>
              <Loader color="#7e22ce" height={40} width={80} />
            </div>
          ) : (
            <button
              onClick={(e) => finalSaveHander()}
              disabled={!password}
              className="rounded-lg border-2 border-solid border-white bg-green-500 px-2 py-1 font-medium text-white outline outline-[3px] outline-green-500 disabled:opacity-55"
            >
              {t("Save")}
            </button>
          )}
          <Link
            href={`/${locale}/reset-pass`}
            className="w-max text-sm font-medium text-blue-600"
          >
            {t("Forget Your Password ?")}
          </Link>
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default LoginInfo;

{
  /* <li
onClick={(e) => editInfohandler("password")}
className="flex flex-col items-center justify-center"
>
<span className="font-medium text-rose-800"> Password : </span>
<span> * * * * *</span>
</li> */
}
