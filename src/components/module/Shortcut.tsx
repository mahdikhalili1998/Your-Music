import { Iheader } from "@/types/header";
import Link from "next/link";
import React, { FC } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Shortcut: FC<Iheader> = ({ header, open, setOpen, locale }) => {
  return (
    <div
      className={`${locale === "fa" ? "directon-ltr" : null} ${!open ? null : "pointer-events-none blur-sm"} fixed bottom-3 z-[49] flex w-full items-center justify-between rounded-lg bg-p-700 p-2 px-2 sm:fixed sm:left-0 sm:top-[30%] sm:h-max sm:w-max sm:flex-col sm:items-center sm:justify-start sm:gap-10 sm:py-10 sm:pt-10`}
    >
      <Link href={`/${locale}/overViwe`}>
        <MdAccountCircle className="text-3xl text-white" />
      </Link>
      <Link href={`/${locale}/search`}>
        <FiSearch className="mr-5 text-3xl text-white sm:mr-0" />
      </Link>
      <div>
        <Link
          href={`/${locale}/add-post`}
          className="absolute -top-[5px] right-[37%] rounded-full bg-gradient-to-r from-p-500 to-p-200 p-4 270:right-[40%] 350:right-[42%] sm:static sm:p-0 sm:text-2xl"
        >
          <PiMusicNotesPlusBold className="text-2xl text-white" />
        </Link>
      </div>
      <Link href="/">
        <ImHome className="text-2xl text-white" />
      </Link>
      <Link href={`/${locale}/setting-page`}>
        <IoMdSettings className="text-2xl text-white" />
      </Link>
    </div>
  );
};

export default Shortcut;
