"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { p2e } from "@/helper/replaceNumber.js";
import moment from "moment";

const ShowPost: FC<IShowPost> = ({ post }) => {
  return (
    <div>
      {post.map((item) => (
        <div
          key={item._id}
          className="mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4 font-iransans"
        >
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
