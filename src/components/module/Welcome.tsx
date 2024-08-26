"use client";
import { IUser } from "@/types/props";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const Welcome: FC<IUser> = ({ user }) => {
  const { status } = useSession();

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
          <span className="text-p-950">{`Welcome ${user.name}`}</span>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        },
      );
    }
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Welcome;
