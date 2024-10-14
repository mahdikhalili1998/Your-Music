"use client";
import { IProfilePost } from "@/types/props";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import MusicPlayer from "../template/Music";

const ProfilePost: FC<IProfilePost> = ({ loader, posts, locale }) => {
  return (
    <div className="mt-7 grid grid-cols-2 400:grid-cols-3 900:grid-cols-4 lg:grid-cols-5">
      {loader ? (
        <div className="mx-auto w-max">
          <Loader color="#FFF" width={70} height={40} />
        </div>
      ) : (
        posts?.map((item) => (
          <MusicPlayer
            key={item._id}
            musicUrl={item.musicUrl}
            id={item._id}
            locale={locale}
            date={item.createdAt}
          />
        ))
      )}
      <Toaster />
    </div>
  );
};

export default ProfilePost;
