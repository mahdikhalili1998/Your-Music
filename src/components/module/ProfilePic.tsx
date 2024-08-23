"use client";
import { FC, useRef, useState } from "react";
import { supabase } from "../../../supabase";
import Image from "next/image";
import { IImgProfile, IProfilePicProps } from "@/types/types";

const ProfilePic: FC<IProfilePicProps> = ({ gender }) => {
  const [image, setImage] = useState<File | null>(null);
  const [img, setImg] = useState<IImgProfile>({
    men: "/image/profile.photo.png",
    women: "/image/womenProf.png",
    other: "/image/profile.photo.png",
    user: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        handleUpload(file); // بارگذاری تصویر بلافاصله پس از انتخاب
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      // Upload the file
      let { data, error } = await supabase.storage
        .from("image") // نام باکت خود را اینجا وارد کنید
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      // Get the public URL
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("image")
        .getPublicUrl(filePath);

      if (publicUrlError) {
        console.error("Error getting public URL:", publicUrlError.message);
      } else {
        console.log("Public URL:", publicUrlData.publicUrl);
        setImg({ ...img, user: publicUrlData.publicUrl });
        setImage(null); // تصویر را پاک می‌کند
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="z-10 mx-auto">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-3 z-10 -mb-14 flex cursor-pointer items-center justify-center rounded-full border-solid border-p-700 bg-white"
      >
        <Image
          alt="profile.pic"
          src={
            img.user
              ? img.user
              : gender === "men"
                ? img.men
                : gender === "women"
                  ? img.women
                  : img.other
          }
          priority
          width={180}
          height={180}
          className="h-24 w-24 rounded-full"
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePic;
