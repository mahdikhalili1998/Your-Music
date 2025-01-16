import React, { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import userInfo from "@/model/userInfo";
import ConnectDB from "@/utils/ConnectDB";
import { createTranslator } from "next-intl";
import faMessages from "../../../messages/fa.json";
import enMessages from "../../../messages/en.json";
import userPost from "@/model/userPost";
import Link from "next/link";
import { IParams } from "@/types/props";
import ShowPost from "@/components/module/ShowPost";
import InstallAppUSeEffect from "@/components/element/InstallAppUSeEffect";
import Welcome from "@/components/module/Welcome";

const Home = async ({ params }: IParams) => {
  const { locale } = await params;
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
        savePost: dbUser.savePost,
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
        <Link
          href={`/${locale}/profile`}
          className="animated-bg mb-10 ml-6 w-full justify-center rounded-lg px-2 py-2 text-xs sm:mx-3 sm:w-full sm:text-sm"
        >
          {t("UnAuthenticated")}
        </Link>
      )}

      {user ? (
        <Welcome
          user={JSON.parse(JSON.stringify({ ...user }))}
          locale={locale}
        />
      ) : null}

      <div className="sm:mx-6">
        <div className="">
          <InstallAppUSeEffect locale={locale} />
        </div>
        <ShowPost
          locale={locale}
          post={JSON.parse(JSON.stringify(post))}
          info={JSON.parse(JSON.stringify(info))}
          user={JSON.parse(JSON.stringify(user))}
        />
      </div>
    </div>
  );
};

export default Home;
