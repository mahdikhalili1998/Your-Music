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
  // useEffect(() => {
  //   const phoneNumber = localStorage.getItem("phoneNumber");
  //   if (phoneNumber) {
  //     setChangePass({ ...changePass, phone: phoneNumber });
  //     const num = `{"to":"${phoneNumber}"}`;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer your_auth_token",
  //     };
  //     // console.log(phoneNumber);
  //     setLoader(true);
  //     axios
  //       .post("api/proxy", JSON.stringify(num), { headers })
  //       .then((res) => {
  //         // console.log(res);
  //         if (res.data.status === "ارسال نشده") {
  //           toast.error("please try again later");
  //           setLoader(false);
  //           return;
  //         }
  //         if (res) {
  //           setOtpCode(res?.data.code);
  //           setResetPass(true);
  //           setLoader(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (error) {
  //           console.log(error);
  //           toast.error("Server Error , try again", {
  //             position: "top-center",
  //             transition: Flip,
  //           });
  //           return;
  //         }
  //       });
  //   } else {
  //     router.push("/profile");
  //   }
  // }, []);

  const otpHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(changePass.phone)) {
      toast.error("Enter the correct phone number", {
        position: "top-center",
        transition: Flip,
      });
      return;
    }

    const num = { to: changePass.phone }; // تبدیل به یک آبجکت برای JSON.stringify
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_auth_token", // هدر Authorization در صورت نیاز
    };

    setLoader(true);
    try {
      const proxyRes = await axios.post("/api/proxy", JSON.stringify(num), {
        headers,
      });
      console.log(proxyRes);
      if (proxyRes.status === 200) {
        setOtpCode(proxyRes.data.code);
        setLoader(false);
      }
    } catch (error) {
      if (error.response) {
        // خطای سرور
        if (error.response.status === 409) {
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error("Server Error, try again", {
            position: "top-center",
            transition: Flip,
          });
        }
      } else {
        // خطای شبکه
        // console.log(error);
        toast.error("Network Error, try again", {
          position: "top-center",
          transition: Flip,
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const enterCodeHandler = () => {
    if (otpCode === userOtpCode) {
      setResetModal(true);
    } else {
      toast.warning("The entered value does not match the SMS code", {
        position: "top-center",
        transition: Flip,
      });
    }
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
            <div className="flex flex-col items-center justify-center gap-3">
              <input
                type="number"
                id="user phone"
                name="user phone"
                placeholder="Your phone number"
                value={changePass.phone}
                onChange={(e) =>
                  setChangePass({ ...changePass, phone: e.target.value })
                }
                className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
              />
              <input
                type="number"
                id="otpCode"
                name="otpCode"
                placeholder="Code ... "
                value={userOtpCode}
                onChange={(e) => setUserOtpCode(e.target.value)}
                className={`${otpCode ? "block" : "hidden"} rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700`}
              />
            </div>
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
          ) : otpCode ? (
            <button
              className="rounded-lg bg-p-700 px-2 py-1 text-white"
              onClick={(e) => enterCodeHandler()}
            >
              {" "}
              Change Password
            </button>
          ) : (
            <button
              onClick={(e) => otpHandler(e)}
              className="rounded-lg bg-p-700 px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-55"
              disabled={!changePass.phone}
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
