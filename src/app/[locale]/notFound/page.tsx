"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function PageNotFound() {
  const t = useTranslations("pageNotFound");
  return (
    <div className="h-screen w-full sm:w-max sm:mx-auto sm:h-fit sm:mt-16 sm:rounded-xl sm:p-14 space-y-10 bg-gradient-to-r from-p-500 to-p-200  py-5 md:w-full md:mx-4">
      <h1 className=" text-xl font-medium pl-2 text-white">
        {t("Page was not found")}
      </h1>
      <Link
        className="flex flex-col items-center justify-center  font-medium text-p-950"
        href="/"
      >
        <Image
          alt="404"
          className="size-[17rem]"
          width={300}
          height={300}
          src={"/image/notFound.png"}
        />
        Go to main page
      </Link>
    </div>
  );
}

export default PageNotFound;
