"use client";

import React, { useState, useRef, ChangeEvent, FC } from "react";
import WaveSurfer from "wavesurfer.js";
import { supabase } from "../../../supabase.js";
import { IAudioUploader } from "@/types/props.js";

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

const AudioUploader: FC<IAudioUploader> = ({
  cutAudioUrl,
  setCutAudioUrl,
  locale,
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [cutStart, setCutStart] = useState<string>("0:00");
  const [cutEnd, setCutEnd] = useState<string>("0:00");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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
      const startInSeconds = parseTime(cutStart);
      const endInSeconds = parseTime(cutEnd);
      const duration = endInSeconds - startInSeconds;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioData = await audioContext.decodeAudioData(arrayBuffer);

      // Create a new audio buffer for the cut audio
      const cutBuffer = audioContext.createBuffer(
        audioData.numberOfChannels,
        duration * audioData.sampleRate,
        audioData.sampleRate,
      );
      for (let i = 0; i < audioData.numberOfChannels; i++) {
        cutBuffer.copyToChannel(
          audioData
            .getChannelData(i)
            .slice(
              startInSeconds * audioData.sampleRate,
              endInSeconds * audioData.sampleRate,
            ),
          i,
        );
      }

      // Convert audio buffer to WAV
      const wavData = audioBufferToWav(cutBuffer);
      const blob = new Blob([wavData], { type: "audio/wav" });

      const fileExt = "wav";
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `music/${fileName}`;

      let { error } = await supabase.storage
        .from("music")
        .upload(filePath, blob);

      if (error) {
        throw error;
      }

      const { publicUrl } = supabase.storage
        .from("music")
        .getPublicUrl(filePath).data;

      setCutAudioUrl(publicUrl);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const byteLength = buffer.length * numChannels * bytesPerSample;
    const bufferLength = byteLength + 44; // Add WAV header length
    const wav = new Uint8Array(bufferLength);

    // Write WAV header
    const dataView = new DataView(wav.buffer);
    let offset = 0;

    const setString = (str: string) => {
      for (let i = 0; i < str.length; i++) {
        dataView.setUint8(offset + i, str.charCodeAt(i));
      }
      offset += str.length;
    };

    setString("RIFF");
    dataView.setUint32(offset, bufferLength - 8, true);
    offset += 4;
    setString("WAVE");
    setString("fmt ");
    dataView.setUint32(offset, 16, true);
    offset += 4; // Subchunk1Size
    dataView.setUint16(offset, format, true);
    offset += 2; // AudioFormat
    dataView.setUint16(offset, numChannels, true);
    offset += 2; // NumChannels
    dataView.setUint32(offset, sampleRate, true);
    offset += 4; // SampleRate
    dataView.setUint32(offset, sampleRate * numChannels * bytesPerSample, true);
    offset += 4; // ByteRate
    dataView.setUint16(offset, numChannels * bytesPerSample, true);
    offset += 2; // BlockAlign
    dataView.setUint16(offset, bitDepth, true);
    offset += 2; // BitsPerSample
    setString("data");
    dataView.setUint32(offset, byteLength, true);
    offset += 4;

    // Write PCM samples
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i] * 0x7fff; // Convert to 16-bit PCM
        dataView.setInt16(offset, sample < 0 ? sample | 0x8000 : sample, true);
        offset += 2;
      }
    }

    return wav;
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
    </div>
  );
};

export default AudioUploader;

{
  /* 
      {cutAudioUrl && (
        <div className="mt-6">
          <h3>Processed Audio:</h3>
          <audio controls>
            <source src={cutAudioUrl} type="audio/wav" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )} */
}
