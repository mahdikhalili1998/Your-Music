"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

function PageNotFound() {
  const { locale } = useParams();
  const t = useTranslations("pageNotFound");

  return (
    <div className="h-screen w-full space-y-10 bg-gradient-to-r from-p-500 to-p-200 py-5 sm:mx-auto sm:mt-16 sm:h-fit sm:w-max sm:rounded-xl sm:p-14 md:mx-auto md:items-center">
      <div className="flex flex-col justify-between">
        <h1
          className={`${locale === "fa" ? "pr-2 text-p-950" : "pl-2 text-white"} mb-4 text-xl font-medium`}
        >
          {t("Page was not found")}
        </h1>
        <div className="px-3">
          {locale === "en" ? (
            <Link
              href={"/fa/notFound"}
              className="flex items-center justify-end gap-2 text-p-950"
            >
              <h2 className="mt-1 font-iransans font-medium text-p-950">
                {t("lang")}
              </h2>
              <span>
                <Image
                  src={"/image/iran.png"}
                  width={200}
                  height={200}
                  priority
                  alt="iran-falg"
                  className="size-9 rounded-[100%] border-2 border-solid border-p-950"
                />
              </span>
            </Link>
          ) : (
            <Link
              href={"/en/notFound"}
              className="flex items-center justify-end gap-2 text-p-950"
            >
              <h2 className="mt-1 font-medium text-white">{t("lang")}</h2>
              <span>
                <Image
                  src={"/image/usa.png"}
                  width={200}
                  height={200}
                  priority
                  alt="iran-falg"
                  className="size-9 rounded-[100%] border-2 border-solid border-white"
                />
              </span>
            </Link>
          )}
        </div>
      </div>
      <Link
        className="flex flex-col items-center justify-center font-medium text-p-950"
        href="/"
      >
        <Image
          alt="404"
          className="size-[17rem]"
          width={300}
          height={300}
          src={"/image/notFound.png"}
          priority
        />
        {t("Go to main page")}
      </Link>
    </div>
  );
}

export default PageNotFound;
