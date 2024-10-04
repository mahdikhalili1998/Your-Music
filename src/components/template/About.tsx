"use client";
import { ILocale } from "@/types/props";
import React, { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import Link from "next/link";

const About: FC<ILocale> = ({ locale }) => {
  const t = useTranslations("aboutPage");
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((prevCount) => (prevCount === 6 ? 1 : prevCount + 1));
    }, 3000);
    return () => clearTimeout(interval);
  }, [count]);

  const rightHandler = () => {
    setCount((prevCount) => (prevCount === 6 ? 1 : prevCount + 1));
  };

  const leftHandler = () => {
    setCount((prevCount) => (prevCount === 1 ? 6 : prevCount - 1));
  };

  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : "font-Roboto"} bg-gradient-to-r from-p-500 to-p-200 py-5 pb-20 sm:mx-4 sm:rounded-xl sm:p-2 sm:pb-14`}
    >
      <h2
        className={`mb-8 text-lg font-medium ${locale === "fa" ? "mr-2 text-p-950" : "ml-2 text-white"}`}
      >
        {t("Little about me")} :
      </h2>
      <div className="mx-auto flex w-max items-center gap-2 p-4">
        {locale === "fa" ? (
          <span onClick={rightHandler}>
            <FaChevronCircleRight className="text-2xl text-p-950" />
          </span>
        ) : (
          <span onClick={leftHandler}>
            <FaChevronCircleLeft className="text-2xl text-p-950" />
          </span>
        )}
        <Image
          src={`/me/${count}.jpg`}
          width={600}
          height={600}
          alt="mahdi-photo"
          priority
          className="h-auto w-[10rem] rounded-2xl 450:w-[14rem] sm:w-[16rem] md:w-[20rem]"
        />
        {locale === "fa" ? (
          <span onClick={leftHandler}>
            <FaChevronCircleLeft className="text-2xl text-p-950" />
          </span>
        ) : (
          <span onClick={rightHandler}>
            <FaChevronCircleRight className="text-2xl text-p-950" />
          </span>
        )}
      </div>
      <div
        className={`${locale === "fa" ? "mx-4" : "mx-4"} my-3 text-p-950 md:text-lg`}
      >
        <p>{t("bio")}</p>
        <p>
          {t("bio2")} {locale === "en" ? "1998/4/10" : "1377/1/21"} {t("bio3")}
        </p>
        <p>{t("bio4")}</p>
        <p>{t("bio5")}</p>
        <p>{t("finally")}</p>
      </div>
      <div>
        <h2
          className={`mb-8 text-lg font-medium ${locale === "fa" ? "mr-2 text-p-950" : "ml-2 text-white"} md:text-xl`}
        >
          {t("contact methods")} :
        </h2>
        <div
          className={`mx-3 space-y-6 bg-white py-3 ${locale === "en" ? "-ml-2 rounded-br-[10rem] rounded-tr-[10rem] pl-5 350:mr-16 350:pl-10 450:mr-28 550:mr-36 sm:-ml-4 670:mr-44 md:mr-64 900:rounded-br-[100%] 900:rounded-tr-[100%]" : "-mr-2 rounded-bl-[10rem] rounded-tl-[10rem] pr-5 font-medium 350:ml-16 350:pr-10 450:ml-28 550:ml-36 sm:-mr-4 670:ml-44 md:ml-64 900:rounded-bl-[100%] 900:rounded-tl-[100%]"} md:text-lg 900:mx-auto 900:w-max 900:rounded-[100%] 900:p-16 900:px-28`}
        >
          <Link
            href="https://github.com/mahdikhalili1998"
            className="flex items-center gap-3 text-p-950"
          >
            <Image
              className="size-10 rounded-full"
              width={200}
              height={200}
              src="/image/gitt.jpg"
              alt="github"
            />
            {t("GitHub")}
          </Link>
          <Link
            href="https://t.me/mehdi_lhj"
            className="flex items-center gap-3 text-p-950"
          >
            {" "}
            <Image
              className="w-10 rounded-full"
              width={200}
              height={200}
              src="/image/tel.jpg"
              alt="telgram"
            />
            {t("Telegram")}
          </Link>
          <Link
            href="https://instagram.com/mahdi_lhj"
            className="flex items-center gap-3 text-p-950"
          >
            {" "}
            <Image
              className="w-10 rounded-full"
              width={200}
              height={200}
              src="/image/insta.jpg"
              alt="github"
            />
            {t("Instagram")}
          </Link>
          <Link
            href="https://wa.me/989389668917"
            className="flex items-center gap-3 text-p-950"
          >
            {" "}
            <Image
              className="w-10 rounded-full"
              width={200}
              height={200}
              src="/image/whatsapp.jpg"
              alt="github"
            />
            {t("WhatsApp")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
