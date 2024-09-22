"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const ShowPost: FC<IShowPost> = ({ post }) => {
  return (
    <div>
      {post.map((item) => (
        <div key={item._id} className="mx-1 flex flex-col gap-5 font-iransans">
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
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
