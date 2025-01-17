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
import { FiShare2 } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";

const ShowPost: FC<IShowPost> = ({ post, info, user, locale }) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderId, setLoaderId] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const [editCaption, setEditCaption] = useState<string>("");
  const [isEditCaption, setIsEditCaption] = useState<boolean>(false);
  const reversedPost = post.toReversed();
  const divRef = useRef(null);
  const router = useRouter();
  const t = useTranslations("showPostPage");
  const E = useTranslations("enum");

  momentJalaali.loadPersian({ usePersianDigits: true });

  const closeMenu = () => {
    setActivePostId(null); // بستن منو
  };

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
    router.push(`/${locale}/comment/${id}`);
  };

  const shareHandler = (id: string) => {
    navigator.clipboard
      .writeText(
        `https://your-music-two.vercel.app//${locale}/postDetail/${id}`,
      )
      .then((res) => toast.success(t("copy")))
      .catch((error) => console.log(error));
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

  const editCaptionHandler = async (id: string, text: string) => {
    setIsEditCaption(true);
    setPostId(id);
    setEditCaption(text);
    closeMenu();
  };

  const finallEditCaption = async (id: string) => {
    setLoader(true);
    await axios
      .patch("/api/upload", { data: { text: editCaption, id } })
      .then((res) => {
        if (res.status === 201) {
          toast.success(E("caption"));
          setIsEditCaption(false);
          setPostId("");
          setEditCaption("");
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
    setLoader(false);
  };

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
                  ref={divRef}
                  className={`${activePostId !== item._id ? "hidden" : "absolute right-1"} ${
                    locale === "fa" ? "px-6" : null
                  } z-10 flex flex-col items-start justify-center gap-2 rounded-lg bg-gray-300 p-2 px-4 font-medium`}
                >
                  {!user ? null : user.userName === item.userName ? (
                    <div className="flex flex-col items-start justify-start gap-2">
                      <span
                        onClick={(e) => deleteHandler(item._id)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <AiFillDelete /> {t("delete")}
                      </span>
                      <span
                        onClick={(e) =>
                          editCaptionHandler(item._id, item.description)
                        }
                        className="flex w-max items-center gap-2 text-blue-600"
                      >
                        <MdModeEditOutline className="text-lg" /> {t("edit")}
                      </span>
                    </div>
                  ) : null}
                  <a
                    href={item.musicUrl}
                    className="flex w-max items-center gap-2 text-green-700"
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
                <span
                  className="flex items-center gap-2"
                  onClick={(e) => showCommentHandler(item._id)}
                >
                  <FaRegComment className="text-xl" />
                  {item.comment.length}
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
                <span
                  className="flex items-center gap-2"
                  onClick={(e) => shareHandler(item._id)}
                >
                  <FiShare2 className="text-2xl" />
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
                <span
                  className="flex items-center gap-2"
                  onClick={(e) => toast.error(t("comment"))}
                >
                  <FaRegComment className="text-xl" />
                  {item.comment.length}
                </span>
                <span onClick={(e) => toast.error(t("sign in"))}>
                  <FaRegBookmark className="text-xl" />
                </span>
                <span
                  className="flex items-center gap-2"
                  onClick={(e) => shareHandler(item._id)}
                >
                  <FiShare2 className="text-2xl" />
                </span>
              </div>
            )}
            {isEditCaption && postId === item._id ? (
              <div className="flex flex-col items-center gap-3 rounded-lg bg-p-300 px-2 py-4">
                <input
                  type="text"
                  className={`${isPersian(item.description) ? "font-iransans" : "font-Roboto"} bg-transparent focus:outline-none ${locale === "fa" ? "font-iransans" : "font-Roboto"}`}
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />
                <button
                  disabled={!editCaption}
                  onClick={(e) => finallEditCaption(item._id)}
                  className="w-max rounded-lg bg-p-700 px-3 py-1 text-white shadow-md shadow-p-950 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {loader ? (
                    <div>
                      <Loader color="#fff" width={40} height={15} />
                    </div>
                  ) : (
                    t("edits")
                  )}
                </button>
              </div>
            ) : (
              <p
                className={`${isPersian(item.description) ? "font-iransans" : "font-Roboto"} font-medium text-p-950`}
              >
                {item.description}
              </p>
            )}

            <p className="-mt-4 text-xs font-medium text-gray-600">
              {locale === "fa"
                ? momentJalaali(item.createdAt).format("jYYYY/jMM/jDD")
                : p2e(moment(item.createdAt).format("YYYY/MM/DD"))}
            </p>
          </div>
        );
      })}
      {/* <div className={`${showComment ? "absolute top-0" : ""}`}>
        <CommentModal
          showComment={showComment}
          setShowComment={setShowComment}
          postId={postId}
          locale={locale}
        />
      </div> */}
      <Toaster />
    </div>
  );
};

export default ShowPost;
