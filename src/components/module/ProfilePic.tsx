import { IProfilePicProps } from "@/types/types";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { supabase } from "../../../supabase"; // اطمینان حاصل کنید که مسیر صحیح است

const ProfilePic: FC<IProfilePicProps> = ({ gender }) => {
  const img = {
    men: "/image/profile.photo.png",
    women: "/image/womenProf.png",
    other: "/image/profile.photo.png",
  };

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  console.log(file);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const filePath = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("image") // نام باکت خود را اینجا وارد کنید
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // دریافت لینک عمومی
      const { publicURL, error: urlError } = supabase.storage
        .from("image")
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      setImageUrl(publicURL || ""); // اطمینان از اینکه URL به درستی تنظیم شده است
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile); // بارگذاری فایل به طور خودکار
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
            imageUrl ||
            (gender === "men"
              ? img.men
              : gender === "women"
                ? img.women
                : img.other)
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
      {uploading && <p className="text-blue-500">در حال بارگذاری...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ProfilePic;
