"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { regexInfo } from "@/constant/regex.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaPhone } from "react-icons/fa6";
import { UserInfo } from "@/types/types";
import Loader from "../module/Loader";
import AccountFound from "../module/AccountFound";
import Image from "next/image";
import { MESSSGE } from "@/enums/enum";

function FindAccountPage() {
  const [number, setNumber] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    profilePicUrl: "",
    userName: "",
  });
  const { userName, profilePicUrl } = userInfo;

  const findHandler = async () => {
    if (!regexInfo.phoneNumber.test(number)) {
      toast.error("Enter the number in the correct format");
    }
    setLoader(true);
    await axios
      .get("/api/find-account/", { params: { number } })
      .then((res) => {
        if (res.status === 200) {
          setUserInfo({
            profilePicUrl: res.data.userData.profilePicUrl,
            userName: res.data.userData.userName,
          });
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          toast.error("can not find user");
        }

        setLoader(false);
      });
  };
  return userName && profilePicUrl ? (
    <AccountFound profilePicUrl={profilePicUrl} userName={userName} />
  ) : (
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
      <div className="-ml-2 flex flex-col items-start justify-center gap-10 rounded-br-full rounded-tr-full bg-white py-5 pl-2 pr-8">
        <div className="ml-2 flex w-max items-center border-b-2 border-solid border-p-700">
          <span className="ml-2">
            <FaPhone className="text-p-700" />
          </span>
          <input
            type="number"
            name="number"
            id="number"
            placeholder=" phone number"
            onChange={(e) => setNumber(e.target.value)}
            className="w-[10rem] px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-none"
          />
        </div>
        {loader ? (
          <div className="mx-auto w-max">
            <Loader height={40} width={80} />
          </div>
        ) : (
          <button
            onClick={(e) => findHandler()}
            className="ml-5 flex w-max items-center rounded-md bg-p-700 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-55"
            disabled={!number}
          >
            Find Account <MdKeyboardArrowRight className="mt-[2px] text-xl" />{" "}
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default FindAccountPage;
