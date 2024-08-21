import { Iheader } from "@/types/header";
import Link from "next/link";
import React, { FC } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Shortcut: FC<Iheader> = ({ header, open, setOpen }) => {
  return (
    <div
      className={`fixed bottom-3 flex w-full items-center justify-between rounded-lg bg-p-700 p-2 ${!open ? null : "pointer-events-none blur-sm"} `}
    >
      <Link href="/profile">
        <MdAccountCircle className="text-3xl text-white" />
      </Link>
      <Link href="/profile">
        <FiSearch className="mr-5 text-3xl text-white" />
      </Link>
      <div>
        {" "}
        <Link
          href="/"
          className="270:right-[40%] 350:right-[42%] absolute -top-[5px] right-[37%] rounded-full bg-gradient-to-r from-p-500 to-p-200 p-4"
        >
          <PiMusicNotesPlusBold className="text-2xl text-white" />
        </Link>
      </div>

      <Link href="/">
        <ImHome className="text-2xl text-white" />
      </Link>
      <Link href="/">
        <IoMdSettings className="text-2xl text-white" />
      </Link>
    </div>
  );
};

export default Shortcut;
