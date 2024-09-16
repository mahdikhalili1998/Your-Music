"use client";
import { ILocale } from "@/types/props";
import axios from "axios";
import React, { FC } from "react";
import AudioUploader from "../module/AudioUploader";

const AddPostPage: FC<ILocale> = ({ locale }) => {
  const fakeInfo = {
    musicUrl: "ajfiweqfba;f",
    description: ";kalhfklafhl/aaaaOaofha",
  };

  const postHandler = async () => {
    await axios
      .post(`/api/add-post`, { data: fakeInfo })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="px-1">
      <div>
        <p>Lorem ipsum dolor sit amet.</p>
        <AudioUploader />
        <button onClick={(e) => postHandler()}>Post</button>
      </div>
    </div>
  );
};

export default AddPostPage;
