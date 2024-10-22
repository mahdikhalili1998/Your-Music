"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BtLight from "../module/BtLight";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "../module/Loader";
import Link from "next/link";
import { ILocale } from "@/types/props";
import { useTranslations } from "next-intl";
import { p2e } from "@/helper/replaceNumber.js";

function OtpPage({ locale }: ILocale) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [userGender, setUserGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nextLevel, setNextLevel] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("sendOtpPage");
  const E = useTranslations("enum");

  const sendNumber = async () => {
    const num = { to: phoneNumber };
    const phoneRegex = /^09\d{9}$/;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_auth_token",
    };
    if (!phoneRegex.test(phoneNumber)) {
      toast.error(E("Please insert correct Info"));
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/exsitedPhoneNumber", {
        data: p2e(phoneNumber),
      });
      if (res.status === 200) {
        toast.error(E("There is an account with this phone number"));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(E("Error in sending request"));
          setLoading(false);
        } else if (error.response.status === 500) {
          toast.error(E("Server error , try again later"));
          setLoading(false);
        } else if (error.response.status === 403) {
          toast.error(E("Can Not Find User"));
          setLoading(false);
        } else if (error.response.status === 409) {
          await axios
            .post("/api/proxy", JSON.stringify(num), {
              headers,
            })
            .then((res) => {
              if (res.status === 200) {
                setOtpCode(res.data.code);
                setLoading(false);
                setNextLevel(true);
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 500) {
                toast.error(E("Server error , try again later"));
              }
            });
        }
      }
    }
  };

  const otpHandler = () => {
    setLoading(true);
    if (otpCode === userCode) {
      localStorage.setItem("phoneNumber", phoneNumber);
      if (!userGender) {
        toast.error(t("Select your gender"));
      } else {
        localStorage.setItem("gender", userGender);
        router.push(`/${locale}/sign-up`);
      }
      setLoading(false);
    } else {
      toast.error(t("Wrong Code"));
      setLoading(false);
    }
  };

  const editHandler = () => {
    setNextLevel(false);
  };

  return (
    <div
      className={`${locale === "fa" ? "font-iransans" : null} flex flex-col space-y-4 rounded-lg bg-gradient-to-r from-p-500 to-p-200 py-5 sm:mx-3 sm:mt-14`}
    >
      <h2
        className={`${locale === "fa" ? "pr-2 text-right" : "pl-2 text-left text-white"} font-medium text-p-950`}
      >
        {nextLevel ? t("Enter your code :") : t("Enter your phone number :")}
      </h2>
      <div className="mx-auto flex w-max flex-col items-center gap-6 rounded-lg p-3 py-5">
        <div className="flex flex-col items-center justify-center gap-8 md:flex md:flex-row md:items-center md:gap-20">
          {nextLevel ? (
            <Image
              className="md:size-[15rem]"
              src="/image/code.png"
              alt="logo"
              width={200}
              height={200}
              priority
            />
          ) : (
            <Image
              className="md:size-[15rem]"
              src="/image/phones.png"
              alt="logo"
              width={200}
              height={200}
              priority
            />
          )}
          <div className="flex flex-col gap-4 md:mt-5">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={nextLevel ? " x x x x" : "0912 345 6789"}
              value={nextLevel ? userCode : phoneNumber}
              onChange={(e) => {
                nextLevel
                  ? setUserCode(p2e(e.target.value))
                  : setPhoneNumber(p2e(e.target.value));
              }}
              className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
            />
            {nextLevel ? (
              <div className="mx-auto my-2">
                <select
                  id="fruit-select"
                  className="rounded-md border-b-2 border-solid border-p-700 px-2 py-1 text-p-950 focus:outline-none"
                  onChange={(e) => setUserGender(e.target.value)}
                >
                  <option value="">{t("Gender")}</option>
                  <option value="men">{t("Men")}</option>
                  <option value="women">{t("Women")}</option>
                  <option value="other">{t("Other")}</option>
                </select>
              </div>
            ) : null}
            {nextLevel ? (
              loading ? (
                <div className="mx-auto w-max">
                  <Loader color="#fff" height={40} width={80} />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={(e) => otpHandler()}
                    className="rounded-lg bg-p-700 px-2 py-1 text-white disabled:opacity-55"
                    disabled={!userGender && !userCode}
                  >
                    {t("Send")}
                  </button>
                  <button
                    onClick={(e) => editHandler()}
                    className="rounded-lg bg-p-700 px-2 py-1 text-white"
                  >
                    {t("Edit number")}
                  </button>
                </div>
              )
            ) : loading ? (
              <div className="mx-auto w-max">
                <Loader color="#fff" height={40} width={80} />
              </div>
            ) : (
              <button
                onClick={(e) => sendNumber()}
                className="rounded-lg bg-p-700 px-1 py-1 text-white disabled:cursor-not-allowed disabled:opacity-35"
                disabled={!phoneNumber}
              >
                {t("Receive Code")}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 md:flex md:flex-col md:items-center md:justify-center md:gap-3">
          <Link
            className="text-sm font-medium text-p-950 md:text-lg"
            href={`/${locale}/sign-in`}
          >
            {t("_ Do you have an account ?")}
          </Link>
          <BtLight nextLevel={nextLevel} locale={locale} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default OtpPage;
