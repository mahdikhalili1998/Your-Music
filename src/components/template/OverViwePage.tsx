"use client";
import { IUser } from "@/types/props";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { useTranslations } from "next-intl";
import isPersian from "@/helper/LanguageRecognizer.js";
import axios from "axios";

const OverViwePage: FC<IUser> = ({ locale, user }) => {
  const [bio, setBio] = useState<string>("sd");
  const [charCount, setCharCount] = useState<number>(0);
  const t = useTranslations("overViwe");

  const bioHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 150) {
      setBio(text); // بروزرسانی بیو
      setCharCount(text.length); // بروزرسانی تعداد کاراکترها
    }
  };

  const confirmHandler = async () => {
    await axios
      .patch("/api/bio", { data: { id: user._id, bio } })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={`${locale === "fa" ? "directon-ltr font-iransans" : "font-Roboto"} bg-gradient-to-r from-p-500 to-p-200 px-2 py-4`}
    >
      <h1 className="mb-7 flex items-center gap-2 font-Roboto text-lg font-medium text-white">
        <LuUser2 className="-mt-2 text-xl" />
        {user.userName}
      </h1>
      <div className="mb-5 flex gap-8">
        <Image
          src={user.profilePicUrl}
          alt="pic"
          width={300}
          height={300}
          priority
          className="size-[7rem] rounded-[100%] border-2 border-solid border-white"
        />
        <div className="flex flex-col items-center justify-center">
          <h3>{t("Posts")}</h3>
          <span>45</span>
        </div>
      </div>
      <p
        className={`${isPersian(user.name) || isPersian(user.lastName) ? "font-iransans" : "font-Roboto"} font-lg mb-3 ml-3 font-medium text-white`}
      >
        {user.name} {user.lastName}
      </p>
      <div className="flex flex-col">
        <div className="ml-3 flex flex-col">
          <span
            className={`${!bio ? "hidden" : "inline-block"} ${charCount === 150 ? "text-red-600" : "text-p-950"} text-sm`}
          >
            {charCount} / 150
          </span>
          <textarea
            placeholder={
              locale === "fa" ? "بیو را اینجا بنویسید" : "Type bio here "
            }
            className="bg-transparent px-2 py-1 placeholder:text-left placeholder:text-p-950 focus:outline-none"
            value={bio}
            onChange={(e) => bioHandler(e)}
          />
        </div>
        <button
          className={`${!bio ? "hidden" : "inline-block"} mx-auto w-max rounded-lg bg-gradient-to-r from-p-700 to-p-400 px-2 py-1 font-medium text-white`}
          onClick={(e) => confirmHandler(user._id)}
        >
          {t("Confirm")}
        </button>
      </div>
    </div>
  );
};

export default OverViwePage;

{
  /* <Link href={`/${locale}/profile`}>Profile Detail</Link> */
}
