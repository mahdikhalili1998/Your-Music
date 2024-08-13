import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ProfileDetail from "./ProfileDetail";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";

const ProfilePage = async () => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await userInfo.findOne({ email: session?.user?.email });

  return session?.user?.email ? (
    <ProfileDetail userData={JSON.parse(JSON.stringify(user))} />
  ) : (
    <div className="space-y-4">
      <h2 className="text-center font-medium text-p-950">
        SignIn / SignUp to achieve more options :
      </h2>
      <div className="mx-auto flex w-max flex-col items-center gap-4 rounded-lg p-3 py-5 shadow-xl shadow-p-200">
        <Image
          className=""
          src="/image/logo.png"
          alt="logo"
          width={200}
          height={200}
          priority
        />
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-2">
            <p className="text-p-950">_ Don't have an account?</p>
            <Link
              href="send-otp"
              className="rounded-lg bg-p-700 px-2 py-1 tracking-[2px] text-white"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-p-950">_ Have an account?</p>
            <Link
              href="/sign-in"
              className="rounded-lg bg-p-700 px-2 py-1 tracking-[2px] text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
