"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../module/Loader";
import axios from "axios";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/navigation";
import { IPassword } from "@/types/types";

function ResetPasspage() {
  const [userOtpCode, setUserOtpCode] = useState<string>("1234");
  const [otpCode, setOtpCode] = useState<string>("1234");
  const [resetModal, setResetModal] = useState<boolean>(false);
  const [resetPass, setResetPass] = useState<IPassword>({
    password: "",
    repeatPassword: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  //   console.log(otpCode, userOtpCode);
  //   useEffect(() => {
  //     const phoneNumber = localStorage.getItem("phoneNumber");
  //     const num = `{"to":"${phoneNumber}"}`;
  //     const headers = {
  //       "Content-Type": "application/json",
  //     };

  //     axios
  //       .post("api/psroxy", num, { headers })
  //       .then((res) => {
  //         if (res) {
  //           setOtpCode(res?.data.code);
  //         }
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           toast.error("Server Error , try again", {
  //             position: "top-center",
  //             transition: Flip,
  //           });
  //           return;
  //         }
  //       });
  //   }, []);

  const otpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoader(true);
    if (otpCode === userOtpCode) {
      setResetModal(true);
    }
    setLoader(false);
  };

  const passwordHandler = () => {};

  return (
    <div className="bg-gradient-to-r from-p-500 to-p-200 py-3">
      <h2 className="text-center font-medium text-p-950">
        {resetModal ? "Create new password" : "Enter the SMS code"}
      </h2>
      <div className="mx-auto flex w-max flex-col items-center justify-center gap-6 rounded-lg p-3 py-5">
        <Image
          src={resetModal ? "/image/resetPass.png" : "/image/code.png"}
          alt="logo"
          width={200}
          height={200}
          priority
          className="text-center"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          {resetModal ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <input
                type="password"
                id="resetPass"
                name="resetPass"
                placeholder="new password"
                value={resetPass.password}
                onChange={(e) =>
                  setResetPass({ ...resetPass, password: e.target.value })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
              />
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Re-enter the password"
                value={resetPass.repeatPassword}
                onChange={(e) =>
                  setResetPass({ ...resetPass, repeatPassword: e.target.value })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
              />
            </div>
          ) : (
            <input
              type="password"
              id="otpCode"
              name="otpCode"
              placeholder="x x x x"
              value={userOtpCode}
              onChange={(e) => setUserOtpCode(e.target.value)}
              className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
            />
          )}
          {loader ? (
            <div className="mx-auto w-max">
              <Loader height={40} width={80} />
            </div>
          ) : resetModal ? (
            <button
              onClick={(e) => passwordHandler()}
              className="rounded-lg bg-p-700 px-2 py-1 text-white"
            >
              Change Password
            </button>
          ) : (
            <button
              onClick={(e) => otpHandler(e)}
              className="rounded-lg bg-p-700 px-2 py-1 text-white"
            >
              Send
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPasspage;
