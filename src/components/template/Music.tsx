"use client";
import { IMusicUrl } from "@/types/props";
import { FC, useState } from "react";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { p2e } from "@/helper/replaceNumber.js";
import momentJalaali from "moment-jalaali";
import moment from "moment";
import { IoLogOutOutline } from "react-icons/io5";

const MusicPlayer: FC<IMusicUrl> = ({ musicUrl, locale, date, id }) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState<string>("");
  momentJalaali.loadPersian({ usePersianDigits: true });
  const jalaliDate = momentJalaali(date).format("jYYYY/jMM/jDD");

  const playAudio = () => {
    if (musicUrl) {
      setAudioSrc(musicUrl);
      audio.src = musicUrl;
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${isPlaying ? "border-p-300" : "border-white"} flex size-[6rem] items-center justify-center rounded-full border-[3px] border-solid bg-p-700`}
      >
        {isPlaying ? (
          <button onClick={pauseAudio} className={"text-3xl text-p-300"}>
            <FaPause />
          </button>
        ) : (
          <button onClick={playAudio} className="text-3xl text-white">
            <FaPlay />
          </button>
        )}
      </div>{" "}
      <Link
        className="flex flex-col items-center justify-center gap-2 font-medium text-p-950"
        href={`/${locale}/${id}`}
      >
        {locale === "fa" ? jalaliDate : p2e(moment(date).format("YYYY/MM/DD"))}
        <IoLogOutOutline className="text-2xl font-bold text-p-950" />
      </Link>
    </div>
  );
};

export default MusicPlayer;
