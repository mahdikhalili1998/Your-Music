"use client";
import { ILocale } from "@/types/props";
import Image from "next/image";
import React, { FC, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "../module/Loader";

const SearchPage: FC<ILocale> = ({ locale }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [foundedUser, setFoundedUser] = useState<any[]>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  //   console.log(foundedUser);
  const [loader, setLoader] = useState<boolean>(false);
  const t = useTranslations("searchPage");
  const E = useTranslations("enum");
  const [controller, setController] = useState<AbortController | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // برای debouncing

  const searchHandler = async (value: string) => {
    if (!value) {
      return;
    }
    setLoader(true);
    if (controller) {
      controller.abort();
    }
    const newController = new AbortController();
    setController(newController);
    try {
      const res = await axios.get("/api/search", {
        params: { searchValue: value },
        signal: newController.signal,
      });
      console.log(res);
      if (res.status === 200) {
        if (res.data.data.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setFoundedUser(res.data.data);
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log(error);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      searchHandler(searchValue);
    }, 300);
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
          className="w-44 border-none text-center placeholder:text-center focus:outline-none"
        />
        <span onClick={() => searchHandler(searchValue)}>
          <FiSearch className="text-3xl font-bold text-p-700" />
        </span>
      </div>
      <div className="space-y-3">
        {loader ? (
          <div className="mx-auto w-max">
            <Loader color="#fff" height={40} width={80} />
          </div>
        ) : notFound ? (
          <div className="mx-auto w-max">
            <Image
              src={"/image/userNF.png"}
              alt="not found "
              width={300}
              height={300}
              priority
              className="w-[12rem]"
            />
          </div>
        ) : (
          foundedUser?.map((item) => (
            <div
              className="mx-3 flex items-center gap-3 rounded-2xl bg-white px-3 py-1"
              key={item._id}
            >
              <Image
                src={item.profilePicUrl}
                alt="profile"
                width={300}
                height={300}
                priority
                className="size-[4rem] rounded-[100%] border-2 border-solid border-p-700"
              />
              <span className="font-medium text-p-950">{item.userName}</span>
            </div>
          ))
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default SearchPage;
