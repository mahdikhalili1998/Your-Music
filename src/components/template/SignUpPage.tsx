"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SignUpInput from "../module/SignUpInput";
import { redirect } from "next/navigation";
import { ILocale } from "@/types/props";
import { useTranslations } from "next-intl";
import { p2e } from "@/helper/replaceNumber.js";

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
      className={`${locale === "fa" ? "font-iransans" : null} flex flex-col items-start justify-center gap-7 bg-gradient-to-r from-p-500 px-2 to-p-200 py-2`}
    >
      <h2
        className={`${locale === "fa" ? "text-end text-p-950" : "text-start text-white"} ${isEditing && image ? "blur-sm" : null} py-3 pl-2 font-medium`}
      >
        {t("Create Account :")}
      </h2>
      <Image
        className={`${isEditing && image ? "blur-sm" : null} -mt-3`}
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
