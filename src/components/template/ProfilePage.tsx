import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ProfileDetail from "./ProfileDetail";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { FC } from "react";
import { IProfilePageProps } from "@/types/props";
import { createTranslator } from "next-intl";
import faMessages from "../../../messages/fa.json";
import enMessages from "../../../messages/en.json";

export const revalidate = 0;

const ProfilePage: FC<IProfilePageProps> = async ({ locale }) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);

  const messages = locale === "fa" ? faMessages : enMessages;
  const intlConfig = {
    locale: locale,
    messages: messages,
  };
  const t = createTranslator(intlConfig);

  if (!session || !session.user?.email) {
    return (
      <div className={`space-y-4 ${locale === "fa" ? "font-iransans" : null}`}>
        <h2 className="text-center font-medium text-p-950">
          {t("SignIn head")}
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
              <p className="text-p-950">{t(`_ Dont have an account?`)}</p>
              <Link
                href={`/${locale}/send-otp`}
                className={`rounded-lg bg-p-700 px-2 py-1 ${locale === "en" ? "tracking-[2px]" : null} text-white`}
              >
                {t(" Sign Up")}
              </Link>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-p-950">{t("_ Have an account?")}</p>
              <Link
                href={`/${locale}/sign-in`}
                className={`rounded-lg bg-p-700 px-2 py-1 ${locale === "en" ? "tracking-[2px]" : null} text-white`}
              >
                {t(" Sign In")}
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
          {t("User not found, please sign in again")}
        </h2>
      </div>
    );
  }
};

export default ProfilePage;
