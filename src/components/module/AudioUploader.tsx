"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

// تابع فرمت کردن زمان به دقیقه و ثانیه
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// تابع تبدیل فرمت دقیقه:ثانیه به ثانیه
const parseTime = (timeString: string) => {
  const parts = timeString.split(":");
  const minutes = parseInt(parts[0], 10) || 0;
  const seconds = parseInt(parts[1], 10) || 0;
  return minutes * 60 + seconds;
};

const AudioUploader: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [cutStart, setCutStart] = useState<string>("0:00"); // تغییر به رشته
  const [cutEnd, setCutEnd] = useState<string>("0:00"); // تغییر به رشته
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // مدیریت آپلود فایل صوتی
  const handleAudioUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      initWaveSurfer(file);
    }
  };

  // مقداردهی Wavesurfer با فایل صوتی آپلود شده
  const initWaveSurfer = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const audioUrl = e.target?.result as string;

      // ایجاد Wavesurfer instance
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#ddd",
        progressColor: "#4F46E5",
        cursorColor: "#4F46E5",
        barWidth: 2,
        height: 100,
      });

      // بارگذاری فایل صوتی
      wavesurferRef.current.load(audioUrl);

      // تنظیم طول فایل صوتی
      wavesurferRef.current.on("ready", () => {
        const duration = wavesurferRef.current?.getDuration() || 0;
        setAudioDuration(duration);
        setCutEnd(formatTime(duration)); // مقداردهی به صورت دقیقه:ثانیه
      });

      // بروز رسانی زمان فعلی موسیقی
      wavesurferRef.current.on("audioprocess", () => {
        const current = wavesurferRef.current?.getCurrentTime() || 0;
        setCurrentTime(current);
      });
    };

    reader.readAsDataURL(file);
  };

  // مدیریت تغییر زمان شروع برش
  const handleCutStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCutStart(e.target.value);
    const startInSeconds = parseTime(e.target.value);
    // تبدیل زمان به درصد و استفاده از seekTo
    const seekPercentage = startInSeconds / audioDuration;
    wavesurferRef.current?.seekTo(seekPercentage);
  };

  // مدیریت تغییر زمان پایان برش
  const handleCutEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCutEnd(e.target.value);
  };

  // کنترل پخش/توقف موسیقی
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

      // توقف موسیقی به محض رسیدن به زمان پایان
      wavesurferRef.current.on("finish", () => {
        wavesurferRef.current?.pause();
        const seekPercentage = startInSeconds / audioDuration;
        wavesurferRef.current?.seekTo(seekPercentage);
        setIsPlaying(false);
      });
    }
  };

  // ارسال فایل برش خورده به سرور
  const handleSubmit = () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("start", parseTime(cutStart).toString()); // تبدیل زمان به ثانیه
    formData.append("end", parseTime(cutEnd).toString()); // تبدیل زمان به ثانیه

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Audio uploaded:", data);
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
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
            {/* نمایش زمان فعلی و زمان کل موسیقی */}
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

          {/* دکمه‌های پخش و توقف */}
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
    </div>
  );
};

export default AudioUploader;
