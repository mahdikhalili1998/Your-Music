"use client";

import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DeleteAccount from "../module/DeleteAccount";
import { FC, useState } from "react";
import { ISession } from "@/types/props";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SettingPage: FC<ISession> = ({ user, session, locale }) => {
  const [isSure, setIsSure] = useState<boolean>(false);
  const [finalDeleting, setFinalDeleting] = useState<boolean>(false);
  const [language, setLanguage] = useState<boolean>(false);
  const t = useTranslations("SettingPage");
  const router = useRouter();

  const languageHandler = (lang) => {
    setLanguage(false);
    router.push(`/${lang}/`);
  };

  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : null} space-y-8 bg-gradient-to-r from-p-500 to-p-200 p-2`}
    >
      <h2
        className={` ${isSure ? "pointer-events-none blur-sm" : null} ${locale === "fa" ? "text-right font-semibold text-p-950" : "text-left font-medium tracking-[1px] text-white"} `}
      >
        {t("Setting")}
      </h2>
      <div className="mx-auto w-max">
        <Image
          src="/image/setting.png"
          width={300}
          height={300}
          priority
          alt="setting-logo"
          className={`${isSure ? "pointer-events-none blur-sm" : null} size-[11rem]`}
        />
      </div>
      <div
        className={
          locale === "en"
            ? "-ml-2 w-max rounded-br-full rounded-tr-full bg-white p-2 pr-20"
            : "-mr-2 w-max rounded-bl-full rounded-tl-full bg-white p-2 pl-20 pr-4"
        }
      >
        {language ? (
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-2"
              onClick={(e) => languageHandler("fa")}
            >
              <span>{t("Persian")}</span>
              <span>
                <Image
                  src={"/image/iran.png"}
                  width={200}
                  height={200}
                  priority
                  alt="iran-falg"
                  className="size-7"
                />
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={(e) => languageHandler("en")}
            >
              <span>{t("English")}</span>
              <span>
                <Image
                  src={"/image/usa.png"}
                  width={200}
                  height={200}
                  priority
                  alt="iran-falg"
                  className="size-7"
                />
              </span>
            </div>
          </div>
        ) : (
          <>
            {user?.email ? (
              <>
                <DeleteAccount
                  user={user}
                  locale={locale}
                  isSure={isSure}
                  setIsSure={setIsSure}
                  finalDeleting={finalDeleting}
                  setFinalDeleting={setFinalDeleting}
                />
                <Link
                  href={`/${locale}/reset-pass`}
                  className={`${isSure ? "pointer-events-none blur-sm" : null} flex items-center text-p-950`}
                >
                  {t("Reset Password")}
                  {locale === "fa" ? (
                    <MdOutlineKeyboardArrowLeft className="mt-[2px] text-2xl" />
                  ) : (
                    <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
                  )}
                </Link>
              </>
            ) : null}
            <p
              onClick={(e) => setLanguage(true)}
              className={`${isSure ? "pointer-events-none blur-sm" : null} flex items-center`}
            >
              {t("Languages")}
              {locale === "fa" ? (
                <MdOutlineKeyboardArrowLeft className="mt-[2px] text-2xl" />
              ) : (
                <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
              )}
            </p>
            <p className={`${isSure ? "pointer-events-none blur-sm" : null}`}>
              {t("Theme")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
