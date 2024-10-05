"use client";
import { ILocale } from "@/types/props";
import Image from "next/image";
import React, { FC, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SearchPage: FC<ILocale> = ({ locale }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const t = useTranslations("searchPage");
  const E = useTranslations("enum");
  const [controller, setController] = useState<AbortController | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // برای debouncing

  const searchHandler = async (value: string) => {
    if (!value) {
      return;
    }
    if (controller) {
      controller.abort();
    }
    const newController = new AbortController();
    setController(newController);
    try {
      const res = await axios.get("/api/search", {
        params: { searchValue: value },
        signal: newController.signal, // استفاده از سیگنال لغو
      });
      console.log(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log(error);
      }
    }
  };

  // استفاده از debouncing هنگام تغییر مقدار ورودی
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // لغو تایمر قبلی
    }

    // تنظیم تایمر جدید
    debounceTimeout.current = setTimeout(() => {
      searchHandler(searchValue);
    }, 300); // تأخیر 300 میلی‌ثانیه

    // پاک کردن تایمر هنگام unmount کامپوننت
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchValue]);

  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : "font-Roboto"} space-y-8 bg-gradient-to-r from-p-500 to-p-200 pb-8 pt-5`}
    >
      <h2
        className={`${locale === "fa" ? "pr-2 text-p-950" : "pl-2 text-white"} text-lg font-medium`}
      >
        {t("Search")}
      </h2>
      <Image
        src={"/image/search.png"}
        width={300}
        height={300}
        alt="search"
        priority
        className="mx-auto size-[12rem] w-max"
      />
      <div className="mx-2 flex items-center gap-3 rounded-xl bg-white p-2">
        <input
          type="text"
          value={searchValue}
          placeholder={locale === "fa" ? "آیدی" : "user name "}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-44 border-none placeholder:text-center focus:outline-none"
        />
        <span onClick={() => searchHandler(searchValue)}>
          <FiSearch className="text-3xl font-bold text-p-700" />
        </span>
      </div>
      <Toaster />
    </div>
  );
};

export default SearchPage;
