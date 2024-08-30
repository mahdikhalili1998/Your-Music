"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import BtLight from "../module/BtLight";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import axios, { AxiosError } from "axios";
import Loader from "../module/Loader";
import { IAxios } from "@/types/axios";
import Link from "next/link";

function OtpPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  console.log(otpCode);
  const [userCode, setUserCode] = useState<string>("");
  const [userGender, setUserGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nextLevel, setNextLevel] = useState<boolean>(false);
  const router = useRouter();

  const sendNumber = async () => {
    const num = `{"to":"${phoneNumber}"}`;
    const phoneRegex = /^09\d{9}$/;
    const headers = {
      "Content-Type": "application/json",
    };

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Enter the correct phone number", {
        position: "top-center",
        transition: Flip,
      });
      return;
    }

    setLoading(true);

    await axios
      .post("/api/auth/exsitedPhoneNumber", { phoneNumber } as IAxios)
      .then((res) => {
        if (res.status === 200) {
          axios
            .post("api/proxy", num, { headers })
            .then((res) => {
              // console.log(res);
              if (typeof res?.data?.code === "string") {
                setOtpCode(res?.data.code);
                // setLoading(false);
                setNextLevel(true);
                // console.log(otpCode);
              }
            })
            .catch((error) => {
              if (error) {
                // console.log(error);
                toast.error("Server Error , try again", {
                  position: "top-center",
                  transition: Flip,
                });
                // setLoading(false);
                return;
              }
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          // setLoading(false);
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
          return;
        }
      });
    setLoading(false);
  };

  const otpHandler = () => {
    setLoading(true);
    if (otpCode === userCode) {
      localStorage.setItem("phoneNumber", phoneNumber);
      if (!userGender) {
        toast.error("Select your gender", { position: "top-center" });
      } else {
        localStorage.setItem("gender", userGender);
        router.push("/sign-up");
      }
    } else {
      toast.error("Wrong Code", { position: "top-center" });
    }
    setLoading(false);
  };

  const editHandler = () => {
    setNextLevel(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center font-medium text-p-950">
        {nextLevel ? "Enter your code :" : "Enter your phone number :"}
      </h2>
      <div className="mx-auto flex w-max flex-col items-center gap-6 rounded-lg p-3 py-5 shadow-xl shadow-p-200">
        {nextLevel ? (
          <Image
            className=""
            src="/image/code.png"
            alt="logo"
            width={200}
            height={200}
            priority
          />
        ) : (
          <Image
            className=""
            src="/image/phone.png"
            alt="logo"
            width={200}
            height={200}
            priority
          />
        )}

        <div className="flex flex-col gap-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder={nextLevel ? " x x x x" : "0912 345 6789"}
            value={nextLevel ? userCode : phoneNumber}
            onChange={(e) => {
              nextLevel
                ? setUserCode(e.target.value)
                : setPhoneNumber(e.target.value);
            }}
            className="rounded-lg border-2 border-p-700 px-2 py-1 text-center placeholder:text-center focus:outline-p-700"
          />
          {nextLevel ? (
            <div className="mx-auto my-2">
              {/* <label htmlFor="fruit-select">یک میوه انتخاب کنید:</label> */}
              <select
                id="fruit-select"
                className="border-b-2 border-solid border-p-700 text-p-950 focus:outline-none"
                onChange={(e) => setUserGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="other">Other</option>
              </select>
            </div>
          ) : null}
          {nextLevel ? (
            loading ? (
              <div className="mx-auto w-max">
                <Loader height={40} width={80} />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={(e) => otpHandler()}
                  className="rounded-lg bg-p-700 px-2 py-1 text-white disabled:opacity-55"
                  disabled={!userGender && !userCode}
                >
                  Send
                </button>
                <button
                  onClick={(e) => editHandler()}
                  className="rounded-lg bg-p-700 px-2 py-1 text-white"
                >
                  Edit number
                </button>
              </div>
            )
          ) : loading ? (
            <div className="mx-auto w-max">
              <Loader height={40} width={80} />
            </div>
          ) : (
            <button
              onClick={(e) => sendNumber()}
              className="rounded-lg bg-p-700 px-1 py-1 text-white disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!phoneNumber}
            >
              Receive Code
            </button>
          )}
        </div>
        <Link className="text-sm font-medium text-blue-500" href="/sign-in">
          _ Do you have an account ?
        </Link>
        <BtLight nextLevel={nextLevel} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default OtpPage;
