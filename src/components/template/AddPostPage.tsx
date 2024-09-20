"use client";
import { ILocale } from "@/types/props";
import axios from "axios";
import React, { FC } from "react";
import AudioUploader from "../module/AudioUploader";

const AddPostPage: FC<ILocale> = ({ locale }) => {
  return (
    <div className="px-1">
      <div>
        <p>Upload Your Music</p>
        <AudioUploader />
      </div>
    </div>
  );
};

export default AddPostPage;
