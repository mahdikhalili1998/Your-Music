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
import momentJalaali from "moment-jalaali";
import { p2e } from "@/helper/replaceNumber";
import { AiFillDelete } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";

const ShowPost: FC<IShowPost> = ({ post, user, locale }) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [likeState, setLikeState] = useState<boolean>(null);
  const [likeCount, setLikeCount] = useState<number>(null);
  const reversedPost = post.toReversed();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const t = useTranslations("showPostPage");
  const E = useTranslations("enum");
  momentJalaali.loadPersian({ usePersianDigits: true });
  const jalaliDate = momentJalaali(post.createAt).format("jYYYY/jMM/jDD");

  useEffect(() => {
    const result = post.map((item) => {
      setLikeCount(item.likeCount);
      setLikeState(item.likeSituation);
    });
  }, []);

  useEffect(() => {
    router.refresh();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activePostId &&
        refs.current[activePostId] &&
        !refs.current[activePostId]?.contains(event.target as Node)
      ) {
        setActivePostId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePostId]);

  const likeHandler = async (_id: string) => {
    setLikeState((likeState2) => {
      const likeState = !likeState2;

      axios
        .patch("/api/upload", { data: [likeCount, likeState, _id] })
        .then((res) => {
          if (res.status === 201) {
            router.refresh();
          }
        })
        .catch((error) => console.log(error));

      return likeState;
    });
  };

  return (
    <div>
      {reversedPost.map((item) => (
        <div
          key={item._id}
          className={`${locale === "fa" ? "directon-ltr font-iransans" : null} mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={item.profilePicUrl}
                alt="profilePicture"
                width={300}
                height={300}
                priority
                className="size-[4rem] rounded-[100%] border-2 border-solid border-p-700"
              />
              <span className="font-medium text-p-950">{item.userName}</span>
            </div>
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
                  <span className="flex items-center gap-2 text-red-600">
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
          <audio controls className="mx-2 mb-4 w-full max-w-lg">
            <source src={item.musicUrl} type="audio/mp3" />
          </audio>
          <div className="flex items-center gap-4">
            <span
              onClick={(e) => likeHandler(item._id)}
              className="flex items-center gap-2"
            >
              {item.likeSituation ? (
                <FaHeart className="text-xl text-red-600" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
              {item.likeCount}
            </span>
            <span>
              <FaRegComment className="text-xl" />
            </span>
          </div>
          <p className="font-medium text-p-950">{item.description}</p>
          <p className="-mt-4 text-xs font-medium text-gray-600">
            {locale === "fa"
              ? jalaliDate
              : p2e(moment(post.createAt).format("YYYY/MM/DD"))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
