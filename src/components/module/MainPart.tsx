"use client";
import React, { useEffect, useState } from "react";

interface FileDisplayProps {
  filePath: string; // URL فایل صوتی
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  filePath = "",
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    // استفاده از URL دریافتی از دیتابیس
    if (filePath) {
      setFileUrl(filePath);
    }
  }, [filePath]);

  return (
    <div>
      {fileUrl ? (
        <div>
          <p>Audio file:</p>
          <audio controls>
            <source src={fileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p>No audio file available.</p>
      )}
    </div>
  );
};

export default FileDisplay;
