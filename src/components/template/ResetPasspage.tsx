"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Loader from "../module/Loader";
import axios from "axios";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/navigation";
import { IPassword } from "@/types/types";

const ResetPasspage = () => {
  const [userOtpCode, setUserOtpCode] = useState<string>("");
  const [resetModal, setResetModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [resetPass, setResetPass] = useState<boolean>(false);
  const router = useRouter();
  const [otpCode, setOtpCode] = useState<string>("");
  const [changePass, setChangePass] = useState<IPassword>({
    password: "",
    repeatPassword: "",
    phone: "",
  });
  // console.log(otpCode);
  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setChangePass({ ...changePass, phone: phoneNumber });
      const num = `{"to":"${phoneNumber}"}`;
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log(phoneNumber);
      setLoader(true);
      axios
        .post("api/proxy", num, { headers })
        .then((res) => {
          // console.log(res);
          if (res.data.status === "ارسال نشده") {
            toast.error("please try again later");
            setLoader(false);
            return;
          }
          if (res) {
            setOtpCode(res?.data.code);
            setResetPass(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            console.log(error);
            toast.error("Server Error , try again", {
              position: "top-center",
              transition: Flip,
            });
            return;
          }
        });
    } else {
      router.push("/profile");
    }
  }, []);

  const otpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoader(true);
    if (otpCode === userOtpCode) {
      setResetModal(true);
    } else {
      toast.warning("The entered value does not match the SMS code", {
        position: "top-center",
        transition: Flip,
      });
    }
    setLoader(false);
  };

  const passwordHandler = async () => {
    if (changePass.password === changePass.repeatPassword) {
      setLoader(true);
      await axios
        .patch("/api/reset-pass", { changePass })
        .then((res) => {
          //   console.log(res);
          if (res.status === 200 || res.data.status === "ارسال موفق بود") {
            toast.success(res.data.message, {
              position: "top-center",
              transition: Flip,
            });
          }
          router.push("/profile");
        })
        .catch((error) => {
          //   console.log(error);
          if (error) {
            toast.error(error.response.data.message, {
              position: "top-center",
              transition: Flip,
            });
          }
        });
      setLoader(false);
    } else {
      toast.error("Passwords are not the same", {
        position: "top-center",
        transition: Flip,
      });
    }
  };

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
                value={changePass.password}
                onChange={(e) =>
                  setChangePass({ ...changePass, password: e.target.value })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
              />
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Re-enter the password"
                value={changePass.repeatPassword}
                onChange={(e) =>
                  setChangePass({
                    ...changePass,
                    repeatPassword: e.target.value,
                  })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
              />
            </div>
          ) : (
            <input
              type="number"
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
};

export default ResetPasspage;
