import { UserInfo } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import { IoMdPerson } from "react-icons/io";

const AccountFound: FC<UserInfo> = ({ profilePicUrl, userName }) => {
  return (
    <div className="space-y-5 bg-gradient-to-r from-p-500 to-p-200 p-2 py-6">
      <h3 className="font-medium text-white">Is this your account ?</h3>
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src={profilePicUrl}
          alt="profile"
          width={400}
          height={400}
          priority
          className="mx-auto size-[9rem] w-max rounded-[100%] border-2 border-solid border-p-700 shadow-xl shadow-p-200"
        />
        <h2 className="flex items-center gap-3 font-medium text-p-950">
          <IoMdPerson className="text-xl" />
          {userName}
        </h2>
      </div>
    </div>
  );
};

export default AccountFound;
