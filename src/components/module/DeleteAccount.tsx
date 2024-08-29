"use client";
import { IDeleteAccount } from "@/types/props";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { clearAllCookies, clearLocalStorage } from "@/helper/function.js";

const DeleteAccount: FC<IDeleteAccount> = ({ email, isSure, setIsSure }) => {
  const deleteAccountHandler = async () => {
    setIsSure(true);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const yesHandler = async () => {
    const jsonData = JSON.stringify(email); // تبدیل به JSON صحیح

    setLoading(true);
    const toastId = toast.loading("Waiting...");
    await axios
      .delete("/api/delete-account", { data: jsonData })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message, { id: toastId });
          setLoading(false);
          clearAllCookies([
            "next-auth.session-token",
            "next-auth.csrf-token",
            "next-auth.callback-url",
          ]);
          clearLocalStorage();
          router.push("/");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message, { id: toastId });
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => deleteAccountHandler()}
        className={`${isSure ? "pointer-events-none blur-sm" : null} flex items-center font-medium text-red-600`}
      >
        Delete Account{" "}
        <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
      </button>
      {isSure ? (
        <div
          className={`absolute w-max -translate-y-10 translate-x-1/2 space-y-4 rounded-md bg-gradient-to-r from-p-500 to-p-200 p-4`}
        >
          <span className="font-medium text-white"> Are you sure ? </span>
          {loading ? (
            <div className="mx-auto w-max">
              <Loader height={40} width={80} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => yesHandler()}
                className="rounded-lg bg-red-500 px-2 py-1 text-sm font-medium text-white"
              >
                Yes ...
              </button>
              <button
                onClick={(e) => setIsSure(false)}
                className="rounded-lg bg-green-500 px-2 py-1 text-sm font-medium text-white"
              >
                No !
              </button>
            </div>
          )}
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default DeleteAccount;
