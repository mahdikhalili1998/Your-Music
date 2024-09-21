"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const ShowPost: FC<IShowPost> = ({ info, post }) => {
  console.log(info);
  console.log(post);
  return (
    <div>
      {info.map((item, index) => (
        <div key={index}>
          <div>
            <Image
              src={item.profilePicUrl}
              alt="logo"
              width={300}
              height={300}
              priority
            />
            <span>{item.userName}</span>
          </div>
          {post.map((postItem, index) => (
            <div key={index}>
              <p>{postItem.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
