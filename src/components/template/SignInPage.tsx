"use client";
import { IoPersonSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ISignIn } from "@/types/signIn";
import Loader from "../module/Loader";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResetPasspage from "./ResetPasspage";
import axios from "axios";
import { IPassword } from "@/types/types";
import Link from "next/link";

function SignInPage() {
  const [userInfo, setUserInfo] = useState<ISignIn>({
    userName: "",
    password: "",
  });
  const [resetPass, setResetPass] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const { userName, password } = userInfo;
  const [changePass, setChangePass] = useState<IPassword>({
    password: "",
    repeatPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const router = useRouter();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const signInHandler = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      userName,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast.error(res.error, { position: "top-center", transition: Flip });
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const sendOtpHandler = async () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    setChangePass({ ...changePass, phone: phoneNumber });
    const num = `{"to":"${phoneNumber}"}`;
    const headers = {
      "Content-Type": "application/json",
    };

    setLoader(true);
    await axios
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
          // router.push("/reset-pass");
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          toast.error("Server Error , try again", {
            position: "top-center",
            transition: Flip,
          });
          return;
        }
      });
  };

  return (
    <div className="relative">
      {loader ? (
        <div className="absolute left-[5rem] top-[17rem] z-10 blur-none">
          <Loader height={70} width={110} />{" "}
        </div>
      ) : null}
      <div
        className={`${loader ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"}`}
      >
        {resetPass ? (
          <ResetPasspage />
        ) : (
          <div className="flex flex-col gap-7 bg-gradient-to-r from-p-500 to-p-200 pb-8">
            <h2 className="py-3 pl-2 font-medium text-white">
              <span className="tracking-[1px]"> SignIn</span> your account :
            </h2>
            <Image
              src="/image/signUp.png"
              alt="logo"
              width={500}
              height={500}
              className=""
              priority
            />
            <div className="mr-7 flex flex-col gap-10 rounded-ee-full rounded-se-full bg-white pb-5">
              <div className="ml-2 mt-2 flex flex-col items-start gap-6">
                <div className="flex w-[9rem] items-center border-b-2 border-solid border-p-700">
                  <label htmlFor="person " className="-mr-5">
                    <IoPersonSharp className="text-lg text-p-700" />
                  </label>
                  <input
                    id="person"
                    placeholder="userName "
                    onChange={(e) => changeHandler(e)}
                    name="userName"
                    value={userInfo.userName}
                    className="s w-44 bg-inherit px-3 py-1 text-center text-p-950 placeholder:text-center placeholder:text-p-700/65 focus:bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex w-[9rem] items-center border-b-2 border-solid border-p-700">
                  <label htmlFor="lock" className="-mr-5">
                    <FaLock className="text-lg text-p-700" />
                  </label>
                  <input
                    id="lock"
                    placeholder="password"
                    onChange={(e) => changeHandler(e)}
                    name="password"
                    value={userInfo.password}
                    className="w-44 bg-inherit px-3 py-1 text-center text-p-950 placeholder:text-center placeholder:text-p-700/65 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={(e) => signInHandler()}
                className={`ml-auto flex w-max items-center justify-between gap-8 rounded-md bg-white px-4 py-1 font-medium text-p-700 shadow-md shadow-p-400 transition-opacity duration-500`}
              >
                {!loading ? (
                  <>
                    Sign in
                    <RiArrowRightSLine className="mt-1 text-xl text-p-700" />
                  </>
                ) : (
                  <Loader height={24} width={106} />
                )}
              </button>
            </div>
            <div className="ml-5 rounded-bl-full rounded-tl-full bg-white py-8">
              <div className="flex flex-col items-center gap-2 text-sm font-medium text-blue-800">
                <Link href={"/reset-pass"}>_ Forget your password ??</Link>
                <Link href={"/find-account"}>_ Forget your user name ??</Link>
                <p>_ help center </p>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
export default SignInPage;
