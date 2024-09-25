"use client";
import { IShowPass } from "@/types/props";
import { FC, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ShowPass: FC<IShowPass> = ({ locale, setShowPass, showPass }) => {
  return (
    <span onClick={(e) => setShowPass(!showPass)}>
      {showPass ? (
        <FaEyeSlash
          className={`text-xl text-p-700 ${locale === "fa" ? "-mr-5" : "-ml-5"} mt-2`}
        />
      ) : (
        <FaEye
          className={`text-xl text-p-700 ${locale === "fa" ? "-mr-5" : "-ml-5"} mt-2`}
        />
      )}
    </span>
  );
};

export default ShowPass;
