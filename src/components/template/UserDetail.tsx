"use client";
import { ILocale } from "@/types/props";
import React, { FC, useEffect, useState } from "react";
import Loader from "../module/Loader";
import ProfilePost from "../module/ProfilePost";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { LuUser2 } from "react-icons/lu";
import Image from "next/image";
import isPersian from "@/helper/LanguageRecognizer.js";
import { useParams } from "next/navigation";

const UserDetail: FC<ILocale> = ({ user }) => {
  //   console.log(user);
  const [loader, setLoader] = useState<boolean>(false);
  const [noPost, setNoPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>(null);
  const { locale } = useParams();
  const E = useTranslations("enum");
  const t = useTranslations("overViwe");

  useEffect(() => {
    const dataFetcher = async () => {
      setLoader(true);
      if (user) {
        await axios
          .get(`/api/get-post?id=${user._id}`)
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data.data);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 404) {
              toast.error(E("Error in sending request"));
            } else if (error.response.status === 403) {
              toast.error(E("Can Not Find User"));
            } else if (error.response.status === 204) {
              setNoPost(true);
            }
          });
      }

      setLoader(false);
    };
    dataFetcher();
  }, [user]);

  return (
    <div>
      {!user ? (
        <div>
          <Loader color="#fff" width={80} height={40} />
        </div>
      ) : (
        <div
          className={`${locale === "fa" ? "directon-ltr font-iransans" : "font-Roboto"} bg-gradient-to-r from-p-500 to-p-200 px-2 py-8 sm:mx-4 sm:rounded-lg sm:px-4`}
        >
          <h1 className="mb-7 flex items-center gap-2 font-Roboto text-lg font-medium text-white">
            <LuUser2 className="-mt-2 text-xl" />
            {user.userName}
          </h1>
          <div className="mb-5 flex justify-between md:justify-center md:gap-20">
            <Image
              src={user.profilePicUrl}
              alt="pic"
              width={300}
              height={300}
              priority
              className="size-[7rem] rounded-[100%] border-2 border-solid border-white md:size-[9rem]"
            />
            <div className="mr-12 flex flex-col items-center justify-center 500:mr-32">
              <h3 className="text-xl font-medium">{t("Posts")}</h3>
              {posts?.length ? (
                <span className="text-lg font-medium">{posts.length}</span>
              ) : posts?.length === 0 ? (
                <span className="text-lg font-medium">0</span>
              ) : (
                <span className="mt-1">
                  <Loader color=" #fff" width={50} height={20} />
                </span>
              )}
            </div>
          </div>
          <p
            className={`${isPersian(user.name) || isPersian(user.lastName) ? "font-iransans" : "font-Roboto"} font-lg mb-3 ml-3 font-medium text-white md:-ml-[16rem] md:text-center`}
          >
            {user.name} {user.lastName}
          </p>
          {user.bio ? (
            <p
              className={`${isPersian(user.bio) ? "directon-rtl font-iransans mr-4" : "font-Roboto"} mb-3 ml-2`}
            >
              {user.bio}
            </p>
          ) : null}

          <ProfilePost
            loader={loader}
            posts={posts}
            noPost={noPost}
            locale={locale}
          />

          <Toaster />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
