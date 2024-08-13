"use client";

import { IProfileDetail } from "@/types/props";
import { FC } from "react";

const PersonalInfo: FC<IProfileDetail> = ({ userData, openPersonalModal }) => {
  //   console.log(userData);
  return (
    <ul
      className={`space-y-2 transition-all duration-700 ${!openPersonalModal ? "-z-10 h-0 -translate-y-24 opacity-0" : "z-10 h-auto -translate-y-0 opacity-100"} rounded-xl bg-gradient-to-r from-p-200 to-p-300 p-2 text-p-950`}
    >
      <li className="flex flex-col items-center justify-center">
        <span className="font-medium text-rose-800">Name : </span>
        <span>{userData.name}</span>
      </li>
      <li className="flex flex-col items-center justify-center">
        <span className="font-medium text-rose-800">Phone number : </span>
        <span>{userData.phoneNumber}</span>
      </li>
      <li className="flex flex-col items-center justify-center">
        <span className="font-medium text-rose-800"> Membership type : </span>
        <span>{userData.role}</span>
      </li>
      <li className="flex flex-col items-center justify-center">
        <span className="font-medium text-rose-800"> ِDate of sign in : </span>
        <span>{new Date(userData.createdAt).toLocaleDateString("en-US")}</span>
      </li>
    </ul>
  );
};

export default PersonalInfo;
