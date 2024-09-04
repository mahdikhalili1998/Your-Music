"use client";
import { UserInfo } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import Loader from "./Loader";
import Link from "next/link";

const AccountFound: FC<UserInfo> = ({ profilePicUrl, userName }) => {
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const signInHandler = async () => {
    setLoader(true);
    const res = await signIn("credentials", {
      userName,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
    setLoader(false);
  };

  return (
    <div className="space-y-6 bg-gradient-to-r from-p-500 to-p-200 p-2 py-6">
      <h3 className="ml-1 text-left font-medium text-white">
        Is this your account ?
      </h3>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={profilePicUrl}
          alt="profile"
          width={400}
          height={400}
          priority
          className="mx-auto size-[9rem] w-max rounded-[100%] border-2 border-solid border-p-700 shadow-xl shadow-p-200"
        />
        <h2 className="flex items-center gap-3 font-medium text-p-950">
          <IoMdPerson className="text-xl" />
          {userName}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="ml-1 text-left font-medium text-white">
          Enter your password to sign in :
        </h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password here ..."
          className="rounded-lg px-2 py-1 text-center text-p-950 placeholder:text-center focus:outline-none"
        />
        <Link className="text-blue-800" href={"/reset-pass"}>
          _ Forget your password ??
        </Link>
      </div>
      <button
        onClick={(e) => signInHandler()}
        className={`ml-auto flex w-max items-center justify-between gap-8 rounded-md bg-white px-4 py-1 font-medium text-p-700 shadow-md shadow-p-400 transition-opacity duration-500`}
      >
        {!loader ? (
          <>
            Sign in
            <RiArrowRightSLine className="mt-1 text-xl text-p-700" />
          </>
        ) : (
          <Loader height={24} width={106} />
        )}
      </button>
      <Toaster />
    </div>
  );
};

export default AccountFound;
