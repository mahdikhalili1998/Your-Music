"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SignUpInput from "../module/SignUpInput";
import { redirect } from "next/navigation";

function SignUpPage() {
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const userPhone = localStorage.getItem("phoneNumber");
    const userGender = localStorage.getItem("gender");
    if (!userGender && !userPhone) redirect("/send-otp");
  }, []);
  return (
    <div className="flex flex-col items-start justify-center gap-7 bg-gradient-to-r from-p-500 to-p-200 py-2">
      <h2
        className={`${isEditing && image ? "blur-sm" : null} py-3 pl-2 text-start font-medium text-white`}
      >
        Create Account :
      </h2>
      <Image
        className={`${isEditing && image ? "blur-sm" : null} -mt-3`}
        src={"/image/signUp.png"}
        alt="sign-up"
        width={350}
        height={350}
        priority
      />
      <SignUpInput
        image={image}
        setImage={setImage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default SignUpPage;
