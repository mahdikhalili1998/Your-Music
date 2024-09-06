import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ProfileDetail from "./ProfileDetail";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { FC } from "react";
import { IProfilePageProps } from "@/types/props";

export const revalidate = 0;

const ProfilePage: FC<IProfilePageProps> = async ({ locale }) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <div className="space-y-4">
        <h2 className="text-center font-medium text-p-950">
          SignIn / SignUp to achieve more options :
        </h2>
        <div className="mx-auto flex w-max flex-col items-center gap-4 rounded-lg p-3 py-5 shadow-xl shadow-p-200">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={200}
            height={200}
            priority
          />
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-2">
              <p className="text-p-950">_ Don&apos;t have an account?</p>
              <Link
                href={`/${locale}/send-otp`}
                className="rounded-lg bg-p-700 px-2 py-1 tracking-[2px] text-white"
              >
                Sign Up
              </Link>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-p-950">_ Have an account?</p>
              <Link
                href={`/${locale}/sign-in`}
                className="rounded-lg bg-p-700 px-2 py-1 tracking-[2px] text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = await userInfo.findOne({ email: session.user.email }).lean();

  if (user) {
    return (
      <ProfileDetail
        userData={JSON.parse(JSON.stringify(user))}
        locale={JSON.parse(JSON.stringify(locale))}
      />
    );
  } else {
    return (
      <div className="space-y-4">
        <h2 className="text-center font-medium text-p-950">
          User not found, please sign in again.
        </h2>
      </div>
    );
  }
};

export default ProfilePage;
