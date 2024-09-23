"use client";
import { ILocale } from "@/types/props";
import axios from "axios";
import React, { FC, useState } from "react";
import AudioUploader from "../module/AudioUploader";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddPostPage: FC<ILocale> = ({ locale }) => {
  const [cutAudioUrl, setCutAudioUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const sendHandler = async () => {
    await axios
      .post("/api/upload", { data: { cutAudioUrl, description } })
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
          router.push("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-gradient-to-r from-p-500 to-p-200 px-2 py-3">
      <div>
        <h2 className="text-lg font-medium text-white">Create post</h2>
        <Image
          width={300}
          height={300}
          priority
          alt="logo"
          src={"/image/post.png"}
          className="mx-auto w-max"
        />
        <AudioUploader
          locale={locale}
          cutAudioUrl={cutAudioUrl}
          setCutAudioUrl={setCutAudioUrl}
        />
      </div>
      <div>
        <textarea
          rows={8}
          value={description}
          placeholder="type your description"
          onChange={(e) => setDescription(e.target.value)}
          className="mx-auto w-full rounded-lg p-2 placeholder:pt-2 placeholder:text-center focus:outline-none"
        />
      </div>
      <div className="my-5 mb-8 flex items-center justify-center">
        <button
          className="rounded-[100%] border-2 border-solid border-green-800 bg-gradient-to-r from-green-300 to-green-700 p-5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={(e) => sendHandler()}
          disabled={!cutAudioUrl || !description}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPostPage;
