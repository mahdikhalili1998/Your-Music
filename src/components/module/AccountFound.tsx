"use client";
import { IUserFound } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import Loader from "./Loader";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { p2e } from "@/helper/replaceNumber.js";

const AccountFound: FC<IUserFound> = ({ profilePicUrl, userName, locale }) => {
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("foundAccountModule");
  const E = useTranslations("enum");
  const signInHandler = async () => {
    setLoader(true);
    const res = await signIn("credentials", {
      userName,
      password,
      redirect: false,
    });
    if (res?.error === "422") {
      toast.error(E("Please insert correct Info"));
    } else if (res?.error === "404") {
      toast.error(E("Can Not Find User"));
    } else if (res?.error === "401") {
      toast.error(E("Wrong password"));
    } else if (res?.error === "500") {
      toast.error(E("Server error , try again later"));
    } else {
      router.push("/");
    }
    setLoader(false);
  };

  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : null} space-y-6 bg-gradient-to-r from-p-500 to-p-200 p-2 py-6 md:mx-4 md:mt-[6rem] md:rounded-xl`}
    >
      <h3
        className={`${locale === "fa" ? "text-right text-p-950" : "text-left text-white"} ml-1 font-medium`}
      >
        {t("Is this your account ?")}
      </h3>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={profilePicUrl}
          alt="profile"
          width={400}
          height={400}
          priority
          className="mx-auto size-[9rem] w-max rounded-[100%] border-2 border-solid border-p-700 shadow-xl shadow-p-200"
        />
        <h2 className="flex items-center gap-3 font-medium text-p-950">
          <IoMdPerson className="text-xl" />
          {userName}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h3
          className={`${locale === "fa" ? "text-right text-p-950" : "text-left text-white"} ml-1 font-medium`}
        >
          {t("Enter your password to sign in")} :
        </h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(p2e(e.target.value))}
          placeholder={locale === "fa" ? "رمز عبور" : "Password here ..."}
          className="rounded-lg px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-none"
        />
        <Link className="text-blue-800" href={`/${locale}/reset-pass`}>
          {t("_ Forget your password ??")}
        </Link>
      </div>
      <button
        onClick={(e) => signInHandler()}
        disabled={!password}
        className={`${locale === "fa" ? "directon-ltr ml-auto" : "ml-auto"} flex w-max items-center justify-between gap-8 rounded-md bg-white px-4 py-1 font-medium text-p-700 shadow-md shadow-p-400 transition-opacity duration-500 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {!loader ? (
          <>
            {t("Sign in")}
            <RiArrowRightSLine className="mt-1 text-xl text-p-700" />
          </>
        ) : (
          <Loader color="#7e22ce" height={24} width={106} />
        )}
      </button>
      <Toaster />
    </div>
  );
};

export default AccountFound;
