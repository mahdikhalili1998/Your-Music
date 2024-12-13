import { IInstallApp } from "@/types/props";
import React, { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const InstallApp: FC<IInstallApp> = ({
  showInstallModal,
  closeModal,
  installhandler,
  locale,
}) => {
  const t = useTranslations("InstallAppPage");
  return (
    showInstallModal && (
      <div
        className={`${locale === "fa" ? "directon-rtl 500:right-3 550:right-8 600:left-7 600:top-24 sm:right-16 sm:w-max 700:right-28 md:right-40 lg:right-72 xl:right-96" : "directon-ltr 500:left-3 550:left-8 600:right-7 600:top-24 sm:left-16 sm:w-max 700:left-28 md:left-40 lg:left-72 xl:left-96"} absolute z-40 flex flex-col items-center justify-center gap-5 rounded-xl bg-gradient-to-r from-p-700 to-p-400 px-10 py-5 backdrop-blur`}
      >
        <h3
          className={`${locale === "fa" ? "font-iransans text-sm" : "font-Roboto"} text-white`}
        >
          {t("h3")}
        </h3>
        <Image
          src="/image/install-app.png"
          width={500}
          height={500}
          alt=" add to homeScreen"
          priority
          className="size-[13rem]"
        />
        <div className="flex gap-3 text-sm">
          <button
            className="rounded-lg bg-green-600 px-2 py-1 font-medium text-white"
            onClick={(e) => installhandler()}
          >
            {t("install")}
          </button>
          <button
            className="rounded-lg bg-red-500 px-2 py-1 font-medium text-white"
            onClick={(e) => closeModal()}
          >
            {t("no")}
          </button>
        </div>
      </div>
    )
  );
};

export default InstallApp;
