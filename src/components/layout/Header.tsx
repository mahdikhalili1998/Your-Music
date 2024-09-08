"use client";
import { IoMdMusicalNote } from "react-icons/io";
import { BsHeadphones } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FC, useEffect, useState } from "react";
import { Iheader } from "@/types/header";
import Link from "next/link";

const Header: FC<Iheader> = ({ open, setOpen, locale }) => {
  const clickHandler = () => {
    setOpen(true);
  };

  return (
    <div
      className={`${!open ? null : "pointer-events-none blur-sm"} relative transition-all duration-300`}
    >
      <div
        className={`flex ${locale === "fa" ? "flex-row-reverse" : null} justify-between bg-gradient-to-r from-p-500 to-p-200 py-3 font-shantell`}
      >
        <h2
          className={`relative ml-2 mt-5 flex ${locale === "fa" ? "flex-row-reverse" : null} items-center p-2 text-3xl text-p-200`}
        >
          <Link
            href="/"
            className={`flex ${locale === "fa" ? "flex-row-reverse" : null} items-center`}
          >
            <span className="animate-moveDown mr-1 text-[2.5rem]"> Y </span> our
            <span className="animate-TurnOff_on ml-2">Music</span>
          </Link>
          <span className="animate-moveDown mt-2">
            <IoMdMusicalNote className="text-purple-900" />
          </span>{" "}
          <span className="animate-moveDown absolute -top-2 left-0">
            <BsHeadphones className="text-[2.4rem] text-purple-900" />
          </span>
        </h2>
        <span onClick={() => clickHandler()} className="animate-menuDown mr-1">
          <TiThMenu className={`text-xl ${open ? "hidden" : "block"}`} />
        </span>
      </div>
      <p className="half-circle -mt-1 h-6 w-full rotate-180 bg-gradient-to-r from-p-200 to-p-500"></p>
    </div>
  );
};

export default Header;
