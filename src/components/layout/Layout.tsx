"use client";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoMdCloseCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import Link from "next/link";

function Layout({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative overflow-x-hidden">
      <Header open={open} setOpen={setOpen} header={() => {}} />
      <div className={`my-[3rem]`}>
        <div
          className={`${!open ? null : "opacity-30"} transition-opacity duration-300`}
        >
          {children}
        </div>
        <div
          className={`fixed left-0 top-0 h-max w-full bg-gradient-to-r from-p-500 to-p-200 pb-[3rem] opacity-90 transition-transform duration-700 ${open ? "translate-x-0" : "translate-x-full"} ${open ? "visible" : "invisible"}`}
        >
          <span
            className="mr-1 flex justify-end"
            onClick={() => setOpen(false)}
          >
            <IoMdCloseCircle className={`mt-3 text-2xl text-p-950`} />
          </span>
          <div className="flex justify-center">
            <div className="flex flex-col items-start divide-y-2 divide-p-950 font-Roboto text-black">
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href="profile"
                onClick={() => setOpen(false)}
              >
                <MdAccountCircle className="text-3xl" /> Profile
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href=""
                onClick={() => setOpen(false)}
              >
                <IoMdDownload className="text-3xl" />
                Download
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href=""
                onClick={() => setOpen(false)}
              >
                <IoMdSettings className="text-3xl" />
                Settings
              </Link>
              <Link
                className="custom-divider flex items-center gap-2 px-3 py-2 text-p-950"
                href=""
                onClick={() => setOpen(false)}
              >
                <FaCircleInfo className="text-2xl" /> About us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
