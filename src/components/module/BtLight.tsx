import { IPropsBtLight } from "@/types/props";
import React, { FC } from "react";
import { FaRegCircle } from "react-icons/fa6";

const BtLight: FC<IPropsBtLight> = ({ nextLevel, locale }) => {
  return (
    <div
      className={`${locale === "fa" ? "directon-ltr" : null} flex items-center gap-5 text-sm`}
    >
      <FaRegCircle
        className={`text-p-700 ${!nextLevel ? "rounded-full border-2 border-solid border-white bg-p-700 text-p-700" : null}`}
      />
      <FaRegCircle
        className={`text-p-700 ${nextLevel ? "rounded-full border-2 border-solid border-white bg-p-700 text-p-700" : null}`}
      />
    </div>
  );
};

export default BtLight;
