import { IDeleteAccount } from "@/types/props";
import React, { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const DeleteAccount: FC<IDeleteAccount> = ({ email }) => {
  console.log(email);

  return (
    <div>
      <button className="flex items-center font-medium text-red-600">
        Delete Account{" "}
        <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
      </button>
    </div>
  );
};

export default DeleteAccount;
