"use client";
import Image from "next/image";
import { FC, useState } from "react";
import Loader from "../module/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IPassword } from "@/types/types";
import { p2e } from "@/helper/replaceNumber.js";
import { ILocale } from "@/types/props";
import { useTranslations } from "next-intl";

const ResetPasspage: FC<ILocale> = ({ locale }) => {
  const [userOtpCode, setUserOtpCode] = useState<string>("");
  const [resetModal, setResetModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const [otpCode, setOtpCode] = useState<string>("");

  const [changePass, setChangePass] = useState<IPassword>({
    password: "",
    repeatPassword: "",
    phone: "",
  });
  const t = useTranslations("ResetPassPage");
  const E = useTranslations("enum");

  // console.log(changePass.phone);
  // useEffect(() => {
  //   const phoneNumber = localStorage.getItem("phoneNumber");
  //   if (phoneNumber) {
  //     setChangePass({ ...changePass, phone: phoneNumber });
  //     const num = `{"to":"${phoneNumber}"}`;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer your_auth_token",
  //     };
  //     // console.log(phoneNumber);
  //     setLoader(true);
  //     axios
  //       .post("api/proxy", JSON.stringify(num), { headers })
  //       .then((res) => {
  //         // console.log(res);
  //         if (res.data.status === "ارسال نشده") {
  //           toast.error("please try again later");
  //           setLoader(false);
  //           return;
  //         }
  //         if (res) {
  //           setOtpCode(res?.data.code);
  //           setResetPass(true);
  //           setLoader(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (error) {
  //           console.log(error);
  //           toast.error("Server Error , try again", {
  //             position: "top-center",
  //             transition: Flip,
  //           });
  //           return;
  //         }
  //       });
  //   } else {
  //     router.push("/profile");
  //   }
  // }, []);

  const otpHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(changePass.phone)) {
      toast.error(t("Enter the correct phone number"));
      return;
    }

    const num = { to: p2e(changePass.phone) }; // تبدیل به یک آبجکت برای JSON.stringify
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_auth_token", // هدر Authorization در صورت نیاز
    };
    // console.log(changePass.phone);
    setLoader(true);
    await axios
      .post("/api/auth/exsitedPhoneNumber", {
        data: p2e(changePass.phone),
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          axios
            .post("/api/proxy", JSON.stringify(num), {
              headers,
            })
            .then((res) => {
              if (res.status === 200) {
                // console.log(res);
                setOtpCode(res.data.code);
                console.log(otpCode);
                setLoader(false);
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error("error in proxy");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          toast.error(E("Can Not Find User"));
          setLoader(false);
          setChangePass({ ...changePass, phone: "" });
        } else if (error.response.status === 500) {
          toast.error(E("Server error , try again later"));
          setLoader(false);
          setChangePass({ ...changePass, phone: "" });
        }
      });
  };

  const enterCodeHandler = () => {
    if (otpCode === userOtpCode) {
      setResetModal(true);
    } else {
      toast.error(t("The entered value does not match the SMS code"));
    }
  };

  const passwordHandler = async () => {
    if (changePass.password === changePass.repeatPassword) {
      setLoader(true);
      await axios
        .patch("/api/reset-pass", { changePass })
        .then((res) => {
          console.log(res);
          if (res.status === 201 || res.data.status === "ارسال موفق بود") {
            toast.success(E("Changing Password succsessfully"));
          }
          router.push(`/${locale}/sign-in`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            toast.error(E("Error in sending request"));
            setLoader(false);
          } else if (error.response.status === 422) {
            toast.error(E("Please insert correct Info"));
            setLoader(false);
          } else if (error.response.status === 500) {
            toast.error(E("Please insert correct Info"));
            setLoader(false);
          }
        });
    } else {
      toast.error(E("Passwords are not the same"));
    }
  };

  return (
    <div
      className={`${locale === "fa" ? "directon-rtl font-iransans" : ""} bg-gradient-to-r from-p-500 to-p-200 px-2 py-3`}
    >
      <h2
        className={`${locale === "fa" ? "text-right text-p-950" : "text-left text-white"} font-medium`}
      >
        {resetModal ? t("Create new password") : t("Enter your phone number")}
      </h2>
      <div className="mx-auto flex w-max flex-col items-center justify-center gap-6 rounded-lg p-3 py-5">
        <Image
          src={resetModal ? "/image/resetPass.png" : "/image/code.png"}
          alt="logo"
          width={200}
          height={200}
          priority
          className="text-center"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          {resetModal ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <input
                type="password"
                id="resetPass"
                name="resetPass"
                placeholder={locale === "fa" ? "رمز جدید" : "new password"}
                value={changePass.password}
                onChange={(e) =>
                  setChangePass({
                    ...changePass,
                    password: e.target.value,
                  })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-p-700"
              />
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder={
                  locale === "fa"
                    ? "رمز را مجددا وارد کنید"
                    : "Re-enter the password"
                }
                value={changePass.repeatPassword}
                onChange={(e) =>
                  setChangePass({
                    ...changePass,
                    repeatPassword: e.target.value,
                  })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-p-700"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <input
                type="number"
                id="user phone"
                name="user phone"
                placeholder={
                  locale === "fa" ? "شماره تلفن " : "Your phone number"
                }
                value={changePass.phone}
                onChange={(e) =>
                  setChangePass({ ...changePass, phone: p2e(e.target.value) })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-p-700"
              />
              <input
                type="number"
                id="otpCode"
                name="otpCode"
                placeholder={locale === "fa" ? "کد پیامک شده" : "Code ... "}
                value={userOtpCode}
                onChange={(e) => setUserOtpCode(p2e(e.target.value))}
                className={`${otpCode ? "block" : "hidden"} rounded-lg border-2 border-p-700 px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-p-700`}
              />
            </div>
          )}
          {loader ? (
            <div className="mx-auto w-max">
              <Loader height={40} width={80} />
            </div>
          ) : resetModal ? (
            <button
              onClick={(e) => passwordHandler()}
              className="rounded-lg bg-p-700 px-2 py-1 text-white"
            >
              {t("Change Password")}
            </button>
          ) : otpCode ? (
            <button
              className="rounded-lg bg-p-700 px-2 py-1 text-white"
              onClick={(e) => enterCodeHandler()}
            >
              {" "}
              {t("Change Password")}
            </button>
          ) : (
            <button
              onClick={(e) => otpHandler(e)}
              className="rounded-lg bg-p-700 px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-55"
              disabled={!changePass.phone}
            >
              {t("Send")}
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPasspage;
