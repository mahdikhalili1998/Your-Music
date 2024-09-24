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

const ShowPost: FC<IShowPost> = ({ post, user, locale }) => {
  // console.log(post);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [likeState, setLikeState] = useState<boolean>(null);
  const [likeCount, setLikeCount] = useState<number>(null);
  const [lastTap, setLastTap] = useState(0); // برای تشخیص دابل تپ

  // console.log({ likeCount, likeState });
  const reversedPost = post.toReversed();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();

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

  const likeHandler = async () => {
    setLikeState((likeState2) => {
      const likeState = !likeState2;

      axios
        .patch("/api/upload", { data: [likeCount, likeState] })
        .then((res) => {
          if (res.status === 201) {
            router.refresh();
          }
        })
        .catch((error) => console.log(error));

      return likeState;
    });
  };

  const handleDoubleTap = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // اگر دابل تپ شناسایی شد
      likeHandler();
    }

    setLastTap(currentTime);
  };

  return (
    <div>
      {reversedPost.map((item) => (
        <div
          key={item._id}
          onDoubleClick={likeHandler} // برای دابل کلیک روی دسکتاپ
          onTouchStart={handleDoubleTap} // برای دابل تپ روی موبایل
          className={`${locale === "fa" ? "font-iransans" : null} mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4`}
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
                } z-10 flex flex-col items-start justify-center rounded-lg bg-gray-300 p-2 font-medium`}
              >
                {!user ? null : user.userName === item.userName ? (
                  <span className="text-red-600">delete</span>
                ) : null}
                <span className="w-max">download music</span>
              </div>
            </div>
          </div>
          <audio controls className="mx-2 mb-4 w-full max-w-lg">
            <source src={item.musicUrl} type="audio/mp3" />
          </audio>
          <div className="flex items-center gap-4">
            <span
              onClick={(e) => likeHandler()}
              className="flex items-center gap-2"
            >
              {likeState ? (
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
            {moment(item.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
