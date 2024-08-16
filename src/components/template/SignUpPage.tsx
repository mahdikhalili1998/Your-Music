import Image from "next/image";
import React from "react";
import SignUpInput from "../module/SignUpInput";


function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="font-medium text-p-950">Create Account :</h2>
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
