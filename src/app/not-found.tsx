"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function PageNotFound() {
  return (
    <div className="mx-auto w-max bg-gradient-to-r from-p-500 to-p-200 px-2 py-5">
      <h1 className="text-xl font-semibold text-white">Page was not found</h1>
      <Link
        className="flex flex-col items-center justify-center font-medium text-p-950"
        href="/"
      >
        <Image
          alt="404"
          className="size-[17rem]"
          width={300}
          height={300}
          src={"/image/notFound.png"}
        />
        Go to main page
      </Link>
    </div>
  );
}

export default PageNotFound;
