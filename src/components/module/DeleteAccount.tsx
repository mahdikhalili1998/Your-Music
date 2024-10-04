"use client";
import { IDeleteAccount } from "@/types/props";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { clearLocalStorage } from "@/helper/function.js";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const DeleteAccount: FC<IDeleteAccount> = ({
  user,
  isSure,
  locale,
  setIsSure,
  finalDeleting,
  setFinalDeleting,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleter, setDeleter] = useState<string>("");
  const router = useRouter();
  // const t = useTranslations("deleteAccountModule");
  const s = useTranslations("SettingPage");
  const E = useTranslations("enum");

  const deleteHandler = () => {
    if (user.userName === deleter) {
      setFinalDeleting(true);
    } else {
      toast.error(s("The values ​​are not the same"));
    }
  };

  const yesHandler = async () => {
    const jsonData = JSON.stringify(user.email); // تبدیل به JSON صحیح
    setLoading(true);
    const toastId = toast.loading(s("Waiting"));
    await axios
      .delete("/api/delete-account", { data: jsonData })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(E("The operation was successful"), { id: toastId });
          setLoading(false);
          clearLocalStorage();
          signOut({ callbackUrl: `/${locale}/profile` });
          setFinalDeleting(false);
          router.push("/");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(E("Server error , try again later"), { id: toastId });
        setLoading(false);
        setFinalDeleting(false);
      });
  };

  return (
    <div className={`relative ${locale === "fa" ? "font-iransans" : null}`}>
      <button
        onClick={(e) => setIsSure(true)}
        className={`${isSure ? "pointer-events-none blur-sm" : null} flex items-center font-medium text-red-600`}
      >
        {s("Delete Account")}
        {locale === "fa" ? (
          <MdOutlineKeyboardArrowLeft className={"mt-[2px] text-2xl"} />
        ) : (
          <MdOutlineKeyboardArrowRight className={"mt-[2px] text-2xl"} />
        )}
      </button>
      {isSure ? (
        <div
          className={`${locale === "fa" ? "450:right-24 absolute 350:right-12 350:top-10 sm:right-28 sm:top-2" : "450:left-24 absolute 350:left-12 350:top-10 sm:left-28 sm:top-2"}`}
        >
          {finalDeleting ? (
            <div className="flex w-max flex-col items-center justify-center space-y-4 rounded-md bg-gradient-to-r from-p-700 to-p-400 p-4">
              <span className="font-medium text-white"> Are you sure ? </span>
              {loading ? (
                <div className="mx-auto w-max">
                  <Loader color="#7e22ce" height={40} width={80} />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => yesHandler()}
                    className="rounded-lg bg-red-500 px-2 py-1 text-sm font-medium text-white"
                  >
                    {s(" Yes ...")}
                  </button>
                  <button
                    onClick={(e) => {
                      setIsSure(false);
                      setFinalDeleting(false);
                    }}
                    className="rounded-lg bg-green-500 px-2 py-1 text-sm font-medium text-white"
                  >
                    {s("No !")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute flex w-max -translate-y-16 translate-x-0 flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-r from-p-700 to-p-300 p-4">
              <h3 className="text-sm font-medium leading-7 tracking-[1px] text-white">
                {s("Type")}
                <span className="mx-1 rounded-lg bg-red-500 p-1 text-white">
                  {user.userName}
                </span>{" "}
                <br></br>
                {s("to continue")}
              </h3>
              <input
                type="text"
                value={deleter}
                placeholder={
                  locale === "fa"
                    ? "مقدار خواسته شده را تایپ کنید"
                    : "Type the requested phrase ..."
                }
                onChange={(e) => setDeleter(e.target.value)}
                className="rounded-lg text-center text-p-950 placeholder:text-xs focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <button
                  className="rounded-lg bg-red-500 px-4 py-1 text-white disabled:cursor-not-allowed disabled:opacity-55"
                  onClick={(e) => deleteHandler()}
                  disabled={!deleter}
                >
                  {s("Delete")}
                </button>
                <button
                  className="rounded-lg bg-green-600 px-4 py-1 text-white"
                  onClick={(e) => setIsSure(false)}
                >
                  {s("Cancle")}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default DeleteAccount;
