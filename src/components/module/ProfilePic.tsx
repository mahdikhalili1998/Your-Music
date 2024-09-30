"use client";
import { FC, useRef, useState } from "react";
import { supabase } from "../../../supabase";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import { IImgProfile, IProfilePicProps } from "@/types/types";
import { profileImages } from "@/constant/image";
import { useTranslations } from "next-intl";

const ProfilePic: FC<IProfilePicProps> = ({
  setUserInfo,
  userInfo,
  image,
  isEditing,
  setImage,
  setIsEditing,
}) => {
  const [img, setImg] = useState<IImgProfile>({
    men: profileImages.men,
    women: profileImages.women,
    other: profileImages.men,
    user: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(0); // مقدار زوم اولیه
  const t = useTranslations("signUpPage");
  const E = useTranslations("enum");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      setIsEditing(true); // فعال کردن حالت ویرایش
    }
  };

  const handleSave = async () => {
    if (editorRef.current && image) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      const blob = await fetch(canvas).then((res) => res.blob());
      const file = new File([blob], image.name, { type: image.type });

      // آپلود تصویر به Supabase
      handleUpload(file);
    }
  };

  const handleCnacle = () => {
    setIsEditing(false);
    setImage(null);
  };

  const handleUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      let { data, error } = await supabase.storage
        .from("user-profile") // نام باکت خود را اینجا وارد کنید
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("user-profile")
        .getPublicUrl(filePath);

      if (publicUrlError) {
        console.error("Error getting public URL:", publicUrlError.message);
      } else {
        setImg({ ...img, user: publicUrlData.publicUrl });
        // console.log(publicUrlData.publicUrl);
        setUserInfo({ ...userInfo, profilePicUrl: publicUrlData.publicUrl });
        setImage(null);
        setIsEditing(false); // غیرفعال کردن حالت ویرایش
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value));
  };

  return (
    <>
      <div className="relative z-10 mx-auto">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`${isEditing && image ? "pointer-events-none blur-sm" : null} border-3 z-10 flex cursor-pointer items-center justify-center rounded-full border-solid border-p-700 bg-white`}
        >
          <Image
            alt="profile.pic"
            src={
              userInfo.profilePicUrl
                ? userInfo.profilePicUrl
                : img.user
                  ? img.user
                  : userInfo.gender === "men"
                    ? img.men
                    : userInfo.gender === "women"
                      ? img.women
                      : img.other
            }
            priority
            width={400}
            height={400}
            className={`h-[8rem] w-[8rem] rounded-full border-[3px] border-solid border-white shadow-lg shadow-p-400 380:h-[10rem] 380:w-[10rem]`}
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
      {isEditing && image && (
        <div className="400:left-[45px] 500:left-[96px] 600:left-[138px] 600:top-[184px] 640:left-[185px] absolute -left-5 top-8 z-[11] bg-gray-900/50 py-3 330:left-[16px] 330:top-[168px] 820:left-[263px] 1170:left-[29rem]">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={200}
            height={200}
            border={50}
            borderRadius={90} // برش دایره‌ای
            scale={scale} // استفاده از مقدار زوم
            rotate={0}
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
              className="mt-4 w-max"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="rounded-lg bg-p-700 px-2 py-1 text-sm font-medium text-p-200"
              >
                {t("Save")}
              </button>
              <button
                onClick={handleCnacle}
                className="rounded-lg bg-red-700 px-2 py-1 text-sm font-medium text-red-200"
              >
                {t("Cancle")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePic;
