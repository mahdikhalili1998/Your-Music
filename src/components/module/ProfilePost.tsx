"use client";
import { IProfilePost } from "@/types/props";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import MusicPlayer from "../template/Music";

const ProfilePost: FC<IProfilePost> = ({ loader, posts }) => {
  return (
    <div className="mt-7">
      {loader ? (
        <div className="mx-auto w-max">
          <Loader color="#FFF" width={70} height={40} />
        </div>
      ) : (
        posts?.map((item) => (
          <div key={item._id}>
            <MusicPlayer musicUrl={item.musicUrl} />
          </div>
        ))
      )}
      <Toaster />
    </div>
  );
};

export default ProfilePost;
