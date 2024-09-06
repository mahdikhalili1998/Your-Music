"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MdAccountCircle } from "react-icons/md";
import { IoMdDownload, IoMdSettings } from "react-icons/io";
import Link from "next/link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Shortcut from "../module/Shortcut";
import { FaCircleInfo } from "react-icons/fa6";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Header
        open={open}
        setOpen={setOpen}
        header={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main className={`my-[3rem]`}>
        <div
          className={`${!open ? null : "pointer-events-none blur-sm"} transition-all duration-300`}
        >
          {children}
        </div>
        <div
          ref={divRef}
          className={`fixed left-0 top-0 z-50 flex h-full w-full flex-col rounded-bl-[5rem] rounded-tl-[5rem] bg-gradient-to-r from-p-500 to-p-200 pb-[3rem] opacity-90 transition-transform duration-700 ${open ? "translate-x-20" : "translate-x-full"} `}
        >
          <div className="mt-10 flex justify-start">
            <div className="flex flex-col items-start divide-y-2 divide-p-950 font-Roboto text-black">
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href="/profile"
                onClick={() => setOpen(false)}
              >
                <MdAccountCircle className="text-3xl" /> Profile
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href="/download"
                onClick={() => setOpen(false)}
              >
                <IoMdDownload className="text-3xl" /> Download
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href="/setting-page"
                onClick={() => setOpen(false)}
              >
                <IoMdSettings className="text-3xl" /> Setting
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href="/about"
                onClick={() => setOpen(false)}
              >
                <FaCircleInfo className="text-2xl" /> About us"
              </Link>
            </div>
          </div>
          <span className="z-10 -ml-7 mt-7 w-max rounded-bl-lg rounded-tl-lg bg-p-500 px-1 py-2 opacity-90">
            {open ? (
              <IoIosArrowDroprightCircle
                onClick={() => setOpen(false)}
                className="text-2xl text-p-950 opacity-100"
              />
            ) : (
              <IoIosArrowDropleftCircle
                onClick={() => setOpen(true)}
                className="text-2xl text-p-950 opacity-100"
              />
            )}
          </span>
        </div>
      </main>
      <Shortcut
        open={open}
        setOpen={setOpen}
        header={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Footer
        open={open}
        setOpen={setOpen}
        header={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default Layout;
