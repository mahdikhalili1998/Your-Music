"use client";
import { IDeleteAccount } from "@/types/props";
import axios from "axios";
import React, { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const DeleteAccount: FC<IDeleteAccount> = ({ email }) => {
  const deleteAccountHandler = async () => {
    await axios.delete("", { email });
  };
  return (
    <div>
      <button
        onClick={(e) => deleteAccountHandler()}
        className="flex items-center font-medium text-red-600"
      >
        Delete Account{" "}
        <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
      </button>
    </div>
  );
};

export default DeleteAccount;
