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
import Link from "next/link";

const HomePage: FC<ILocale> = async ({ locale }) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  let user = null;
  if (session) {
    const dbUser = await userInfo.findOne({ email: session.user.email });
    if (dbUser) {
      user = {
        name: dbUser.name,
        id: dbUser._id,
        userName: dbUser.userName,
        profilePicUrl: dbUser.profilePicUrl,
      };
    } else {
      return null;
    }
  }
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
  // console.log(info);
  const messages = locale === "fa" ? faMessages : enMessages;
  const intlConfig = {
    locale: locale,
    messages: messages,
  };
  const t = createTranslator(intlConfig);

  return (
    <div>
      {session ? null : (
        <div className="mb-10 flex justify-center">
          <Link
            href={`/${locale}/profile`}
            className="animated-bg mx-auto w-max rounded-lg px-2 py-2 sm:w-full sm:mx-3"
          >
            {t("UnAuthenticated")}
          </Link>
        </div>
      )}

      {user ? (
        <Welcome
          user={JSON.parse(JSON.stringify({ ...user }))}
          locale={locale}
        />
      ) : null}
      <div className="sm:mx-6">
        <ShowPost
          post={JSON.parse(JSON.stringify(post))}
          info={JSON.parse(JSON.stringify(info))}
          user={JSON.parse(JSON.stringify(user))}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default HomePage;
