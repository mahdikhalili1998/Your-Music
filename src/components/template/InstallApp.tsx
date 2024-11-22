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
        className={`${locale === "fa" ? "directon-rtl" : "directon-ltr"} absolute z-40 flex flex-col items-center justify-center gap-5 rounded-xl bg-p-700 px-10 py-5`}
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
