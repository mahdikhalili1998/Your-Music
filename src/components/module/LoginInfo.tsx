"use client";
import { ILoginInfo } from "@/types/editProfileDetail";
import { IProfileDetail } from "@/types/props";
import React, { FC, useRef, useState } from "react";

const LoginInfo: FC<IProfileDetail> = ({ openPersonalModal, userData }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedInfo, setEditedInfo] = useState<ILoginInfo>({
    email: "",
    userName: "",
    updatedAt: userData.updatedAt,
  });
  const [changingOption, setChangingOption] = useState<string>("");
  const inputRef = useRef(null);

  const editInfohandler = (name: string) => {
    setChangingOption(name);
    setEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  return (
    <ul
      className={`space-y-2 transition-all duration-700 ${!openPersonalModal ? "-z-10 h-0 -translate-y-24 opacity-0" : "z-10 h-auto -translate-y-0 opacity-100"} rounded-xl bg-gradient-to-r from-p-200 to-p-300 p-2 text-p-950`}
    >
      <li onClick={(e) => editInfohandler("email")}>
        {changingOption === "email" && edit ? (
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium text-rose-800">Email : </span>{" "}
            <input
              className="rounded-xl px-2 py-1 focus:border-4 focus:border-solid focus:border-p-500 focus:outline-4 focus:outline-white"
              ref={inputRef}
              type="text"
              name="email"
              value={edit ? editedInfo.email : userData.email}
              onChange={(e) => changeHandler(e)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium text-rose-800">Email : </span>
            <span>{userData.email}</span>
          </div>
        )}
      </li>
      <li
        onClick={(e) => editInfohandler("userName")}
        className="flex flex-col items-center justify-center"
      >
        <span className="font-medium text-rose-800">UserName: </span>
        <span>{userData.userName}</span>
      </li>
      <li
        onClick={(e) => editInfohandler("updatedAt")}
        className="flex flex-col items-center justify-center"
      >
        <span className="font-medium text-rose-800"> Last Update Date: </span>
        <span>{new Date(userData.updatedAt).toLocaleDateString("en-US")}</span>
      </li>
    </ul>
  );
};

export default LoginInfo;

{
  /* <li
onClick={(e) => editInfohandler("password")}
className="flex flex-col items-center justify-center"
>
<span className="font-medium text-rose-800"> Password : </span>
<span> * * * * *</span>
</li> */
}
