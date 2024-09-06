"use client";
import { IDeleteAccount } from "@/types/props";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { clearLocalStorage } from "@/helper/function.js";
import { signOut } from "next-auth/react";

const DeleteAccount: FC<IDeleteAccount> = ({
  user,
  isSure,
  locale,
  setIsSure,
  finalDeleting,
  setFinalDeleting,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleter, setDeleter] = useState<string>("");
  const router = useRouter();

  const deleteHandler = () => {
    if (user.userName === deleter) {
      setFinalDeleting(true);
    } else {
      toast.error("The values ​​are not the same");
    }
  };

  const yesHandler = async () => {
    const jsonData = JSON.stringify(user.email); // تبدیل به JSON صحیح
    setLoading(true);
    const toastId = toast.loading("Waiting...");
    await axios
      .delete("/api/delete-account", { data: jsonData })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message, { id: toastId });
          setLoading(false);
          clearLocalStorage();
          signOut({ callbackUrl: `/${locale}/profile` });
          setFinalDeleting(false);
          router.push("/");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message, { id: toastId });
        setLoading(false);
        setFinalDeleting(false);
      });
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => setIsSure(true)}
        className={`${isSure ? "pointer-events-none blur-sm" : null} flex items-center font-medium text-red-600`}
      >
        Delete Account{" "}
        <MdOutlineKeyboardArrowRight className="mt-[2px] text-2xl" />
      </button>
      {isSure ? (
        <div className={` `}>
          {finalDeleting ? (
            <div className="absolute flex w-max -translate-y-16 translate-x-1/2 flex-col items-center justify-center space-y-4 rounded-md bg-gradient-to-r from-p-700 to-p-300 p-4">
              <span className="font-medium text-white"> Are you sure ? </span>
              {loading ? (
                <div className="mx-auto w-max">
                  <Loader height={40} width={80} />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => yesHandler()}
                    className="rounded-lg bg-red-500 px-2 py-1 text-sm font-medium text-white"
                  >
                    Yes ...
                  </button>
                  <button
                    onClick={(e) => {
                      setIsSure(false);
                      setFinalDeleting(false);
                    }}
                    className="rounded-lg bg-green-500 px-2 py-1 text-sm font-medium text-white"
                  >
                    No !
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute flex w-max -translate-y-16 translate-x-0 flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-r from-p-700 to-p-300 p-4">
              <h3 className="text-sm font-medium leading-7 tracking-[1px] text-white">
                Type{" "}
                <span className="rounded-lg bg-red-500 p-1 text-white">
                  {user.userName}
                </span>{" "}
                <br></br>
                to continue ...
              </h3>
              <input
                type="text"
                value={deleter}
                placeholder="Type the requested phrase ..."
                onChange={(e) => setDeleter(e.target.value)}
                className="rounded-lg text-center text-p-950 placeholder:text-xs focus:outline-none"
              />
              <button
                className="rounded-lg bg-red-500 px-4 py-1 text-white disabled:cursor-not-allowed disabled:opacity-55"
                onClick={(e) => deleteHandler()}
                disabled={!deleter}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default DeleteAccount;
