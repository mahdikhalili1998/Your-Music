import React, { FC } from "react";
import Welcome from "../module/Welcome";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import userInfo from "@/model/userInfo";
import ConnectDB from "@/utils/ConnectDB";
import { createTranslator } from "next-intl";
import faMessages from "../../../messages/fa.json";
import enMessages from "../../../messages/en.json";
import { ILocale } from "@/types/props";
import userPost from "@/model/userPost";
import ShowPost from "../module/ShowPost";

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

  // گرفتن پست‌ها
  const post = await userPost.find();
  let info = null;
  if (post) {
    info = await Promise.all(
      post.map(async (item) => {
        const userInfoes = await userInfo.findOne({ _id: item.userId });
        return userInfoes;
      }),
    );
  }

  const messages = locale === "fa" ? faMessages : enMessages;
  const intlConfig = {
    locale: locale,
    messages: messages,
  };
  const t = createTranslator(intlConfig);

  return (
    <div>
      {user ? <Welcome user={{ ...user }} /> : null}
      <div>
        <ShowPost post={JSON.parse(JSON.stringify(post))} />
      </div>
    </div>
  );
};

export default HomePage;
