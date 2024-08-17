"use client";
import { IProfileDetail } from "@/types/props";
import Image from "next/image";
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";
import React, { FC, useState } from "react";
import PersonalInfo from "../module/PersonalInfo";
import { RiLogoutCircleRLine } from "react-icons/ri";
import LoginInfo from "../module/LoginInfo";
import { signOut } from "next-auth/react";
import ResetPasspage from "./ResetPasspage";
import { IPassword } from "@/types/types";

const ProfileDetail: FC<IProfileDetail> = ({ userData }) => {
  const [openPersonalModal, setOpenPersonalModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [resetPass, setResetPass] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [changePass, setChangePass] = useState<IPassword>({
    password: "",
    repeatPassword: "",
    phone: "",
  });
  // console.log(openPersonalModal);

  const personalHandler = () => {
    setOpenPersonalModal((openPersonalModal) => !openPersonalModal);
  };
  const loginHandler = () => {
    setOpenLoginModal((openLoginModal) => !openLoginModal);
  };

  const signOutHandler = () => {
    signOut({ callbackUrl: "/profile" });
  };

  return (
    <>
      {resetPass ? (
        <ResetPasspage
          otpCode={otpCode}
          setChangePass={setChangePass}
          changePass={changePass}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-p-500 to-p-200 py-3">
          <Image
            src="/image/info.png"
            width={200}
            height={200}
            alt="information"
            priority
          />
          <div className={`flex flex-col items-center justify-center gap-4`}>
            <button
              onClick={(e) => personalHandler()}
              className="flex place-items-center gap-2 rounded-lg bg-white bg-gradient-to-r from-white to-p-300 px-2 py-1 font-medium text-p-950 shadow-md shadow-p-300"
            >
              Personal Info
              {openPersonalModal ? (
                <RiArrowUpWideFill className="mt-1 text-2xl font-medium text-p-950" />
              ) : (
                <RiArrowDownWideFill className="mt-1 text-2xl font-medium text-p-950" />
              )}
            </button>
            <PersonalInfo
              userData={userData}
              openPersonalModal={openPersonalModal}
              setChangePass={setChangePass}
              changePass={changePass}
              setOtpCode={setOtpCode}
              setResetPass={setResetPass}
            />
            <button
              onClick={(e) => loginHandler()}
              className="flex place-items-center gap-2 rounded-lg bg-white bg-gradient-to-r from-white to-p-300 px-2 py-1 font-medium text-p-950 shadow-md shadow-p-300"
            >
              Login Info
              {openLoginModal ? (
                <RiArrowUpWideFill className="mt-1 text-2xl font-medium text-p-950" />
              ) : (
                <RiArrowDownWideFill className="mt-1 text-2xl font-medium text-p-950" />
              )}
            </button>
            <LoginInfo
              userData={userData}
              openPersonalModal={openLoginModal}
              setChangePass={setChangePass}
              changePass={changePass}
              setOtpCode={setOtpCode}
              setResetPass={setResetPass}
            />
          </div>
          <button
            onClick={(e) => signOutHandler()}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-2 py-1 font-medium text-white"
          >
            Sign Out <RiLogoutCircleRLine className="text-2xl font-medium" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileDetail;
