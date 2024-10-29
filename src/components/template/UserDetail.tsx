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
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LuGrid } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProfileSavePost from "../module/ProfileSavePost";

const UserDetail: FC<ILocale> = ({ user }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [noPost, setNoPost] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("post");
  const [noPostSave, setNoPostSave] = useState<boolean>(false);
  const [savePost, setSavePost] = useState<any[]>(null);
  const [posts, setPosts] = useState<any[]>(null);
  const { locale } = useParams();
  const E = useTranslations("enum");
  const t = useTranslations("overViwe");
  const { status, data } = useSession();
  const router = useRouter();

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
              setNoPost(true);
            } else if (error.response.status === 403) {
              toast.error(E("Can Not Find User"));
            }
          });
      } else {
        return <h1>LOADING ....</h1>;
      }

      setLoader(false);
    };
    const getSavePosts = async () => {
      const userSavePosts = user.savePost.join(",");
      await axios
        .get("/api/save-post", { params: { user: userSavePosts } })
        .then((res) => {
          if (res.status === 200) {
            setSavePost(res.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            setNoPostSave(true);
          } else if (error.response.status === 403) {
            toast.error(E("Can Not Find User"));
          }
        });
    };

    dataFetcher();
    getSavePosts();
  }, [user]);

  const categoryHandler = (e: string) => {
    setCategory(e);
  };

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
          <div className="flex gap-2">
            <IoIosArrowRoundBack
              onClick={(e) => router.back()}
              className="-mt-2 text-5xl text-p-950"
            />
            <h1 className="mb-7 flex items-center gap-2 font-Roboto text-lg font-medium text-white">
              <LuUser2 className="-mt-2 text-xl" />
              {user.userName}
            </h1>
          </div>
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
              ) : posts === null ? (
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
              className={`${isPersian(user.bio) ? "directon-rtl mr-4 font-iransans" : "font-Roboto"} mb-3 ml-2`}
            >
              {user.bio}
            </p>
          ) : null}

          {status === "unauthenticated" ? null : user.email ===
            data?.user?.email ? (
            <Link
              className="ml-1 rounded-lg bg-gradient-to-r from-p-700 to-p-500 px-2 py-1 font-medium text-white"
              href={`/${locale}/profile`}
            >
              {t("Profile Detail")}
            </Link>
          ) : null}

          <div className="mt-10 border-t-2 border-solid border-gray-500 pb-2">
            <ul className="mt-4 flex items-center justify-around">
              <li
                onClick={(e) => categoryHandler("post")}
                className={`${category === "post" ? "border-b-[1px] border-solid border-gray-700 text-2xl" : null} flex items-center gap-1`}
              >
                <LuGrid className="text-xl" />
                <span>{t("Posts")}</span>
              </li>
              {status === "unauthenticated" ? null : user.email ===
                data?.user?.email ? (
                <li
                  onClick={(e) => categoryHandler("save")}
                  className={`${category === "save" ? "border-b-[1px] border-solid border-gray-700 text-2xl" : null} flex items-center gap-1`}
                >
                  <FaRegBookmark className="text-xl" />
                  <span>{t("Save")}</span>
                </li>
              ) : null}
            </ul>
          </div>
          {category === "post" && (
            <ProfilePost
              loader={loader}
              noPost={noPost}
              posts={posts}
              noPostSave={noPostSave}
              locale={locale}
            />
          )}
          {category === "save" && (
            <ProfileSavePost
              loader={loader}
              noPost={noPost}
              posts={savePost}
              noPostSave={noPostSave}
              locale={locale}
            />
          )}
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
