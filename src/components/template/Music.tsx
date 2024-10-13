// components/MusicPlayer.tsx

import { IMusicUrl } from "@/types/props";
import { FC, useState } from "react";

const MusicPlayer: FC<IMusicUrl> = ({ musicUrl }) => {
  console.log(musicUrl);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState<string>("");

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
    <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-4 shadow-lg">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-600">
            {isPlaying ? (
              <button onClick={pauseAudio} className="text-3xl text-white">
                &#10074;&#10074; {/* Pause Icon */}
              </button>
            ) : (
              <button onClick={playAudio} className="text-3xl text-white">
                &#9658; {/* Play Icon */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
