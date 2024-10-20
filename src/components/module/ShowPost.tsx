"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useTranslations } from "next-intl";
import { p2e } from "@/helper/replaceNumber";
import { AiFillDelete } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import isPersian from "@/helper/LanguageRecognizer";
import momentJalaali from "moment-jalaali";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa6";

const ShowPost: FC<IShowPost> = ({ post, info, user, locale }) => {
  // console.log(user);

  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [profPic, setProfPic] = useState<string>("");
  const reversedPost = post.toReversed();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const t = useTranslations("showPostPage");
  const E = useTranslations("enum");
  momentJalaali.loadPersian({ usePersianDigits: true });

  const likeHandler = async (id: string, postId: string) => {
    await axios
      .patch("/api/like", { data: { id, postId } })
      .then((res) => {
        if (res.status === 201) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteHandler = async (id: string) => {
    await axios
      .delete("/api/upload", { data: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  const savePostHandler = async (id: string) => {
    await axios
      .patch("/api/save-post", { data: id })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div>
      {reversedPost.map((item) => {
        const userInfo = info.find((user) => user._id === item.userId);
        return (
          <div
            key={item._id}
            className={`${locale === "fa" ? "directon-ltr font-iransans" : null} mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4 md:mx-10 lg:mx-20`}
          >
            <div className="flex items-center justify-between">
              {userInfo && (
                <Link
                  href={`/${locale}/userPage/${userInfo._id}`}
                  className="flex items-center justify-start gap-3"
                >
                  <Image
                    src={userInfo.profilePicUrl}
                    alt="profilePicture"
                    width={300}
                    height={300}
                    priority
                    className="size-[4rem] rounded-[100%] border-2 border-solid border-p-700"
                  />
                  <span className="font-medium text-p-950">
                    {userInfo.userName}
                  </span>
                </Link>
              )}
              <div className="relative">
                <SlOptionsVertical
                  className="-mt-1"
                  onClick={() =>
                    setActivePostId(activePostId === item._id ? null : item._id)
                  }
                />
                <div
                  ref={(el) => (refs.current[item._id] = el)}
                  className={`${
                    activePostId !== item._id ? "hidden" : "absolute right-1"
                  } ${locale === "fa" ? "px-6" : null} z-10 flex flex-col items-start justify-center gap-2 rounded-lg bg-gray-300 p-2 px-4 font-medium`}
                >
                  {!user ? null : user.userName === item.userName ? (
                    <span
                      onClick={() => deleteHandler(item._id)}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <AiFillDelete /> {t("delete")}
                    </span>
                  ) : null}
                  <a
                    href={item.musicUrl}
                    className="flex w-max items-center gap-2"
                  >
                    <LuDownload /> {t("download")}
                  </a>
                </div>
              </div>
            </div>
            <audio controls className="mx-2 mb-4 w-full 350:mx-auto 350:w-64">
              <source src={item.musicUrl} type="audio/mp3" />
            </audio>
            {user ? (
              <div className="flex items-center gap-4">
                <span
                  onClick={() => likeHandler(user.id, item._id)}
                  className="flex items-center gap-2"
                >
                  {item.userLikeId.includes(user.id) ? (
                    <FaHeart className="text-xl text-red-600" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}

                  {item.userLikeId.length ? item.userLikeId.length : null}
                </span>
                <span>
                  <FaRegComment className="text-xl" />
                </span>
                <span onClick={(e) => savePostHandler(item._id)}>
                  <FaRegBookmark className="text-xl" />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span
                  onClick={() => toast.error(t("sign in"))}
                  className="flex items-center gap-2"
                >
                  <FaRegHeart className="text-xl" />
                  {item.userLikeId.length}
                </span>
                <span onClick={() => toast.error(t("sign in"))}>
                  <FaRegComment className="text-xl" />
                </span>
                <span onClick={() => toast.error(t("sign in"))}>
                  <FaRegBookmark className="text-xl" />
                </span>
              </div>
            )}
            <p
              className={`${
                isPersian(item.description) ? "font-iransans" : "font-Roboto"
              } font-medium text-p-950`}
            >
              {item.description}
            </p>
            <p className="-mt-4 text-xs font-medium text-gray-600">
              {locale === "fa"
                ? momentJalaali(item.createdAt).format("jYYYY/jMM/jDD")
                : p2e(moment(item.createdAt).format("YYYY/MM/DD"))}
            </p>
          </div>
        );
      })}
      <Toaster />
    </div>
  );
};

export default ShowPost;
