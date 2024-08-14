"use client";
import { IUser } from "@/types/props";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const Welcome: FC<IUser> = ({ user }) => {
  const { status } = useSession();
  // console.log(result);
  useEffect(() => {
    if (status === "authenticated") {
      toast(`Welcome ${user.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Welcome;
