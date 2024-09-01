"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { regexInfo } from "@/constant/regex.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function FindAccountPage() {
  const [number, setNumber] = useState<string>("");

  const findHandler = async () => {
    if (!regexInfo.phoneNumber.test(number)) {
      toast.error("Enter the number in the correct format");
    }
    await axios
      .get("/api/find-account/", { params: { number } })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="space-y-5 bg-gradient-to-r from-p-500 to-p-200 p-2">
      <h2 className="font-medium text-white">Finding your account :</h2>
      <Image
        src={"/image/findAccount.png"}
        alt="find account"
        width={300}
        height={300}
        priority
        className="mx-auto w-max"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          type="number"
          name="number"
          id="number"
          placeholder="Enter your phone number"
          onChange={(e) => setNumber(e.target.value)}
          className="rounded-lg border-2 border-solid border-p-700 px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-none"
        />
        <button
          onClick={(e) => findHandler()}
          className="flex items-center rounded-md bg-p-700 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-55"
          disabled={!number}
        >
          Find Account <MdKeyboardArrowRight className="mt-[2px] text-xl" />{" "}
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default FindAccountPage;
