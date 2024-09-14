"use client";
import { IUser } from "@/types/props";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";

const Welcome: FC<IUser> = ({ user }) => {
  const { status } = useSession();
  const t = useTranslations("welcomeMdoule");
  useEffect(() => {
    if (status === "authenticated") {
      toast(
        <div className="flex items-center justify-center gap-3">
          <Image
            src={user.profilePicUrl}
            height={400}
            width={400}
            alt="  profilePicUrl"
            priority
            className="h-20 w-20 rounded-[100%] border-[3px] border-solid border-white shadow-2xl shadow-p-700"
          />
          <span className="text-p-950 flex">
            {t("Welcome")} {user.name}
          </span>
        </div>,
      );
    }
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Welcome;
