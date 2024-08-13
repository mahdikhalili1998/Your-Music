"use client";

import { IUserInfo } from "@/types/types";
import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { Bounce, Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

function SignUpInput() {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    userName: "",
    email: "",
    phoneNumber: "",
    role: "user",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { name, userName, email, password, phoneNumber } = userInfo;
  useEffect(() => {
    const userPhone = localStorage.getItem("phoneNumber");
    setUserInfo({ ...userInfo, phoneNumber: `${userPhone}` });
  }, []);

  const regexInfo = {
    name: /^[A-Za-z\u0600-\u06FF]{4,}$/,
    userName: /^[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF0-9_]{3,19}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^1234$/,
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const sendHandler = async () => {
    if (
      !regexInfo.name.test(name) ||
      !regexInfo.email.test(email) ||
      !regexInfo.userName.test(userName) ||
      !regexInfo.password.test(password)
    ) {
      toast("Please enter correct information", {
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
      return;
    }
    setLoading(true);
    await axios
      .post("/api/auth/sign-up", { userInfo })
      .then((res) => {
        toast.success(res.data.message, {
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
        if (res.status === 200) {
          router.push("/sign-in");
        }
      })
      .catch((error) => {
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
      });
    setLoading(false);
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-lg p-5 shadow-lg shadow-p-200">
      {(Object.keys(userInfo) as (keyof IUserInfo)[]).map((key) => (
        <input
          key={key}
          className={`rounded-xl border-2 border-dotted px-2 py-1 text-center text-p-950 placeholder:text-center placeholder:text-p-950 placeholder:opacity-40 read-only:opacity-65 focus:outline-none ${(key === "email" && regexInfo.email.test(userInfo[key as keyof IUserInfo])) || (key === "name" && regexInfo.name.test(userInfo[key as keyof IUserInfo])) || (key === "userName" && regexInfo.userName.test(userInfo[key as keyof IUserInfo])) || (key === "password" && regexInfo.password.test(userInfo[key as keyof IUserInfo])) ? "border-green-500" : "border-p-700"} ${key === "role" ? "hidden" : null}`}
          value={userInfo[key as keyof IUserInfo]}
          name={key}
          readOnly={key === "phoneNumber"}
          placeholder={key}
          onChange={(e) => changeHandler(e)}
        />
      ))}
      {loading ? (
        <div className="mx-auto w-max">
          <Loader height={40} width={80} />
        </div>
      ) : (
        <button
          onClick={(e) => sendHandler()}
          className="rounded-lg bg-p-700 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
          disabled={!name || !userName || !email || !password}
        >
          send
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

export default SignUpInput;
