import React, { FC } from "react";
import Welcome from "../module/Welcome";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import userInfo from "@/model/userInfo";
import ConnectDB from "@/utils/ConnectDB";
import MainPart from "../module/MainPart";
import { createTranslator } from "next-intl";
import faMessages from "../../../messages/fa.json";
import enMessages from "../../../messages/en.json";
import { ILocale } from "@/types/props";

const HomePage: FC<ILocale> = async ({ locale }) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  let user = null;
  if (session) {
    const dbUser = await userInfo.findOne({ email: session.user.email });
    if (dbUser) {
      user = {
        name: dbUser.name,
        profilePicUrl: dbUser.profilePicUrl,
      };
    } else {
      return null;
    }
  }
  const messages = locale === "fa" ? faMessages : enMessages;
  const intlConfig = {
    locale: locale,
    messages: messages,
  };
  const t = createTranslator(intlConfig);

  return (
    <div>
      <MainPart locale={locale} />
      {user ? <Welcome user={{ ...user }} /> : null}
    </div>
  );
};

export default HomePage;
