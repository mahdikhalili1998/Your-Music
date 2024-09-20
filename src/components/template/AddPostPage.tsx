"use client";
import { ILocale } from "@/types/props";
import axios from "axios";
import React, { FC, useState } from "react";
import AudioUploader from "../module/AudioUploader";

const AddPostPage: FC<ILocale> = ({ locale }) => {
  const [cutAudioUrl, setCutAudioUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const sendHandler = async () => {
    await axios
      .post("/api/upload", { data: { cutAudioUrl, description } })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="px-1">
      <div>
        <p>Upload Your Music</p>
        <AudioUploader
          locale={locale}
          cutAudioUrl={cutAudioUrl}
          setCutAudioUrl={setCutAudioUrl}
        />
      </div>
      <div>
        <h3>description</h3>
        <input
          type="text"
          value={description}
          placeholder="type your description"
          onChange={(e) => setDescription(e.target.value)}
          className="mx-auto border-2 border-p-700"
        />
      </div>
      <button onClick={(e) => sendHandler()}>Send</button>
    </div>
  );
};

export default AddPostPage;
