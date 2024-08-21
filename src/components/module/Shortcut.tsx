import { Iheader } from "@/types/header";
import Link from "next/link";
import React, { FC } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { PiMusicNotesPlusBold } from "react-icons/pi";

const Shortcut: FC<Iheader> = ({ header, open, setOpen }) => {
  return (
    <div
      className={`fixed bottom-3 flex w-full items-center justify-between rounded-lg bg-p-700 p-2 ${!open ? null : "pointer-events-none blur-sm"} `}
    >
      <Link href="/profile">
        <MdAccountCircle className="text-3xl text-white" />
      </Link>
      <Link
        href="/"
        className="absolute right-[35%] rounded-full bg-gradient-to-r from-p-500 to-p-200 p-4"
      >
        <PiMusicNotesPlusBold className="text-2xl text-white" />
      </Link>
      <Link href="/">
        <ImHome className="text-2xl text-white" />
      </Link>
    </div>
  );
};

export default Shortcut;
