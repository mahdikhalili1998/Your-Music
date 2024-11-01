// Import required packages
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
import { FaBookmark } from "react-icons/fa6";
import Loader from "./Loader";
import CommentModal from "./CommentModal";

const ShowPost: FC<IShowPost> = ({ post, info, user, locale }) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderId, setLoaderId] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const reversedPost = post.toReversed();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const t = useTranslations("showPostPage");
  momentJalaali.loadPersian({ usePersianDigits: true });

  const likeHandler = async (id: string, postId: string) => {
    setLoaderId(postId);
    setLoader(true);
    await axios
      .patch("/api/like", { data: { id, postId } })
      .then((res) => {
        if (res.status === 201) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
    setLoader(false);
    setLoaderId("");
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

  const showCommentHandler = (id) => {
    setPostId(id);
    setShowComment(true);
  };

  const savePostHandler = async (id: string) => {
    setSaveId(id);
    setLoader(true);
    await axios
      .patch("/api/save-post", { data: id })
      .then((res) => {
        if (res.status === 201) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
    setLoader(false);
    setSaveId("");
  };

  useEffect(() => {
    // Disable scrolling on body when showing comments
    if (showComment) {
      document.body.style.overflow = "hidden"; // Disable body scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable body scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup to enable scrolling again
    };
  }, [showComment]);

  return (
    <div className={`relative`}>
      {reversedPost.map((item) => {
        const userInfo = info.find((user) => user._id === item.userId);
        return (
          <div
            key={item._id}
            className={`${locale === "fa" ? "directon-ltr font-iransans" : null} mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4 md:mx-10 lg:mx-20`}
          >
            <div className="flex items-center justify-between">
              {userInfo ? (
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
              ) : null}
              <div className="relative">
                <SlOptionsVertical
                  className="-mt-1"
                  onClick={() =>
                    setActivePostId(activePostId === item._id ? null : item._id)
                  }
                />
                <div
                  ref={(el) => (refs.current[item._id] = el)}
                  className={`${activePostId !== item._id ? "hidden" : "absolute right-1"} ${locale === "fa" ? "px-6" : null} z-10 flex flex-col items-start justify-center gap-2 rounded-lg bg-gray-300 p-2 px-4 font-medium`}
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
                {loader && loaderId === item._id ? (
                  <div>
                    <Loader color="#7e22ce" width={40} height={20} />
                  </div>
                ) : (
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
                )}
                <span onClick={(e) => showCommentHandler(item._id)}>
                  <FaRegComment className="text-xl" />
                </span>
                {loader && saveId === item._id ? (
                  <div>
                    <Loader color="#7e22ce" width={40} height={20} />
                  </div>
                ) : (
                  <span onClick={() => savePostHandler(item._id)}>
                    {user.savePost.includes(item._id) ? (
                      <FaBookmark className="text-xl" />
                    ) : (
                      <FaRegBookmark className="text-xl" />
                    )}
                  </span>
                )}
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
                <span onClick={(e) => toast.error(t("comment"))}>
                  <FaRegComment className="text-xl" />
                </span>
                <span onClick={(e) => toast.error(t("sign in"))}>
                  <FaRegBookmark className="text-xl" />
                </span>
              </div>
            )}
            <p
              className={`${isPersian(item.description) ? "font-iransans" : "font-Roboto"} font-medium text-p-950`}
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
      <div
        className={`${showComment ? "fixed left-0 right-0 top-0 z-20 h-full overflow-y-scroll bg-slate-100" : "hidden"} directon-ltr`}
      >
        <CommentModal
          showComment={showComment}
          setShowComment={setShowComment}
          postId={postId}
          locale={locale}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default ShowPost;
