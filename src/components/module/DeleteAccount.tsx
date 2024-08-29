"use client";
import { IDeleteAccount } from "@/types/props";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const DeleteAccount: FC<IDeleteAccount> = ({ email, isSure, setIsSure }) => {
  const deleteAccountHandler = async () => {
    setIsSure(true);
  };

  const router = useRouter();

  const yesHandler = async () => {
    const jsonData = JSON.stringify(email);
    router.push("/");
    await axios
      .delete("/api/delete-account", { data: jsonData })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
        }
      })
      .catch((error) => {
        console.log(error);
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
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default DeleteAccount;
