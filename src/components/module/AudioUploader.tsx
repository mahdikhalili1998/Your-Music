"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { supabase } from "../../../supabase.js"; // ایمپورت کلاینت Supabase

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const parseTime = (timeString: string) => {
  const parts = timeString.split(":");
  const minutes = parseInt(parts[0], 10) || 0;
  const seconds = parseInt(parts[1], 10) || 0;
  return minutes * 60 + seconds;
};

const AudioUploader: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [cutStart, setCutStart] = useState<string>("0:00");
  const [cutEnd, setCutEnd] = useState<string>("0:00");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cutAudioUrl, setCutAudioUrl] = useState<string | null>(null);
  console.log(cutAudioUrl);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const handleAudioUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      initWaveSurfer(file);
    }
  };

  const initWaveSurfer = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const audioUrl = e.target?.result as string;
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#ddd",
        progressColor: "#4F46E5",
        cursorColor: "#4F46E5",
        barWidth: 2,
        height: 100,
      });
      wavesurferRef.current.load(audioUrl);
      wavesurferRef.current.on("ready", () => {
        const duration = wavesurferRef.current?.getDuration() || 0;
        setAudioDuration(duration);
        setCutEnd(formatTime(duration));
      });
      wavesurferRef.current.on("audioprocess", () => {
        const current = wavesurferRef.current?.getCurrentTime() || 0;
        setCurrentTime(current);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCutStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCutStart(e.target.value);
    const startInSeconds = parseTime(e.target.value);
    const seekPercentage = startInSeconds / audioDuration;
    wavesurferRef.current?.seekTo(seekPercentage);
  };

  const handleCutEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCutEnd(e.target.value);
  };

  const togglePlayPause = () => {
    if (!wavesurferRef.current) return;

    const startInSeconds = parseTime(cutStart);
    const endInSeconds = parseTime(cutEnd);

    if (isPlaying) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    } else {
      wavesurferRef.current.play(startInSeconds, endInSeconds);
      setIsPlaying(true);
      wavesurferRef.current.on("finish", () => {
        wavesurferRef.current?.pause();
        const seekPercentage = startInSeconds / audioDuration;
        wavesurferRef.current?.seekTo(seekPercentage);
        setIsPlaying(false);
      });
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) return;

    try {
      const fileExt = audioFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `music/${fileName}`;

      let { error, data } = await supabase.storage
        .from("music") // نام bucket که قبلاً ایجاد شده
        .upload(filePath, audioFile);

      if (error) {
        throw error;
      }

      // دریافت لینک عمومی برای فایل آپلود شده
      const { publicUrl } = supabase.storage
        .from("music")
        .getPublicUrl(filePath).data;

      setCutAudioUrl(publicUrl); // تنظیم لینک برش خورده
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="mb-4"
      />
      <div ref={waveformRef} className="w-full"></div>

      {audioFile && (
        <div className="mt-4 w-full">
          <div className="flex justify-between">
            <span>Current Time: {formatTime(currentTime)}</span>
            <span>Total Time: {formatTime(audioDuration)}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <label>
              Start Time:
              <input
                type="text"
                value={cutStart}
                placeholder="0:00"
                onChange={handleCutStartChange}
                className="ml-2 rounded border p-1"
              />
            </label>
            <label>
              End Time:
              <input
                type="text"
                value={cutEnd}
                placeholder="0:00"
                onChange={handleCutEndChange}
                className="ml-2 rounded border p-1"
              />
            </label>
          </div>

          <button
            onClick={togglePlayPause}
            className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white"
          >
            {isPlaying ? "Pause" : "Play Selected"}
          </button>

          <button
            onClick={handleSubmit}
            className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
          >
            Submit Cut Audio
          </button>
        </div>
      )}

      {cutAudioUrl && (
        <div className="mt-6">
          <h3>Processed Audio:</h3>
          <audio controls>
            <source src={cutAudioUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
