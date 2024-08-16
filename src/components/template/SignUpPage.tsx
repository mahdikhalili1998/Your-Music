import Image from "next/image";
import React from "react";
import SignUpInput from "../module/SignUpInput";

function SignUpPage() {
  return (
    <div className="flex flex-col items-start justify-center gap-7 bg-gradient-to-r from-p-500 to-p-200 py-2">
      <h2 className="py-3 pl-2 text-start font-medium text-white">
        Create Account :
      </h2>
      <Image
        className="-mt-3"
        src={"/image/signUp.png"}
        alt="sign-up"
        width={350}
        height={350}
        priority
      />
      <SignUpInput />
    </div>
  );
}

export default SignUpPage;
