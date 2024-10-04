"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SignUpInput from "../module/SignUpInput";
import { redirect } from "next/navigation";
import { ILocale } from "@/types/props";
import { useTranslations } from "next-intl";

function SignUpPage({ locale }: ILocale) {
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations("signUpPage");
  const E = useTranslations("enum");
  useEffect(() => {
    const userPhone = localStorage.getItem("phoneNumber");
    const userGender = localStorage.getItem("gender");
    if (!userGender && !userPhone) redirect(`/${locale}/send-otp`);
  }, []);
  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : null} 820:justify-center flex flex-col items-start justify-center gap-7 bg-gradient-to-r from-p-500 to-p-200 px-2 py-2 sm:mx-7 sm:mt-16 sm:rounded-xl`}
    >
      <h2
        className={`${locale === "fa" ? "pr-2 text-end text-p-950" : "pl-2 text-start text-white"} ${isEditing && image ? "blur-sm" : null} 380:text-lg py-3 pl-2 font-medium`}
      >
        {t("Create Account :")}
      </h2>
      <Image
        className={`${isEditing && image ? "blur-sm" : null} 330:w-[24rem] 330:h-auto mx-auto -mt-3`}
        src={"/image/signUp.png"}
        alt="sign-up"
        width={350}
        height={350}
        priority
      />
      <SignUpInput
        image={image}
        locale={locale}
        setImage={setImage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default SignUpPage;
