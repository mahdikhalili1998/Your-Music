"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import moment from "moment";

const ShowPost: FC<IShowPost> = ({ post }) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const reversedPost = post.toReversed();
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setActivePostId(null); // اگر کلیک بیرون از منو بود، منوی همه پست‌ها بسته شود
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div>
      {reversedPost.map((item) => (
        <div
          key={item._id}
          className="mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4 font-iransans"
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

            {/* دکمه منو برای هر پست */}
            <div className="relative" ref={optionsRef}>
              <SlOptionsVertical
                className="-mt-1"
                onClick={(e) => {
                  setActivePostId(activePostId === item._id ? null : item._id);
                }}
              />
              <div
                className={`${
                  activePostId !== item._id ? "hidden" : "absolute right-1"
                } z-10 flex flex-col items-start justify-center rounded-lg bg-gray-300 p-2 font-medium`}
              >
                <span className="text-red-600">delete</span>
                <span className="w-max">download music</span>
              </div>
            </div>
          </div>

          <audio controls className="mx-2 mb-4 w-full max-w-lg">
            <source src={item.musicUrl} type="audio/mp3" />
          </audio>
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
