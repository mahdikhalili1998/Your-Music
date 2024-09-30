"use client";
import { IProf } from "@/types/props";
import Image from "next/image";
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";
import React, { FC, useEffect, useRef, useState } from "react";
import PersonalInfo from "../module/PersonalInfo";
import { RiLogoutCircleRLine } from "react-icons/ri";
import LoginInfo from "../module/LoginInfo";
import { signOut } from "next-auth/react";
import { profileImages } from "@/constant/image";
import { IImgProfile } from "@/types/types";
import AvatarEditor from "react-avatar-editor";
import { supabase } from "../../../supabase";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbCaptureFilled } from "react-icons/tb";
import { MdKeyboardReturn } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { checkWindowSize } from "@/helper/responsiv.js";

const ProfileDetail: FC<IProf> = ({ userData, locale }) => {
  const [openPersonalModal, setOpenPersonalModal] = useState<boolean>(false);
  const [profileOption, setProfileOption] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null); //مربوط به انتخاب عکس
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [img, setImg] = useState<IImgProfile>({
    men: profileImages.men,
    women: profileImages.women,
    other: profileImages.men,
    user: "",
  });
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1.2); // مقدار زوم اولیه
  const router = useRouter();
  const t = useTranslations("profileDetailPage");
  const E = useTranslations("enum");
  // console.log(userData.profilePicUrl === profileImages.women);
  useEffect(() => {
    checkWindowSize(setOpenPersonalModal, setOpenLoginModal);
    const handleResize = () => {
      checkWindowSize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        console.error(error.message);
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
        // setUserInfo({ ...userInfo, profilePicUrl: publicUrlData.publicUrl });
        userData.profilePicUrl = publicUrlData.publicUrl;
        await axios
          .patch("/api/edit-info/profile-picture", { userData })
          .then((res) => {
            // console.log(res);
            if (res.status === 201) {
              setProfileOption(false);
              toast.success(E("Your profile picture changed"));
            }
          })
          .catch((error) => {
            // console.log(error);
            if (error) {
              toast.error("An error has occurred", {
                position: "top-center",
              });
            }
          });

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
  // console.log(userData);
  const personalHandler = () => {
    setOpenPersonalModal((openPersonalModal) => !openPersonalModal);
  };
  const loginHandler = () => {
    setOpenLoginModal((openLoginModal) => !openLoginModal);
  };

  const signOutHandler = () => {
    signOut({ callbackUrl: `/${locale}/profile` });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      setIsEditing(true); // فعال کردن حالت ویرایش
    }
  };

  const changeProfHandler = () => {
    setProfileOption(true);
  };

  const finallChange = () => {
    fileInputRef.current?.click();
  };

  const deleteProfile = async () => {
    const data = [];
    data.push(userData);

    await axios
      .delete("/api/edit-info/profile-picture", { data })
      .then((res) => {
        if (res.status === 201) {
          router.refresh();
          setProfileOption(false);
          toast.success(E("The operation was successful"));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        className={`flex flex-col ${locale === "fa" ? "directon-rtl font-iransans" : null} items-center justify-center gap-4 bg-gradient-to-r from-p-500 to-p-200 py-3 sm:flex-row sm:justify-start sm:gap-5 sm:rounded-bl-[100%] sm:rounded-tl-[100%] sm:pr-8 670:w-[38rem] md:w-max md:mx-auto md:px-20 md:rounded-bl-xl md:rounded-tl-xl md:rounded-xl md:mt-[106px]`}
      >
        <div className="flex-col gap-8 sm:flex">
          <div className="relative">
            <div onClick={(e) => changeProfHandler()}>
              <Image
                src={userData.profilePicUrl}
                width={400}
                height={400}
                alt="information"
                className={`${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} ${profileOption ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} h-[9rem] w-[9rem] rounded-[100%] border-[3px] border-white shadow-xl shadow-p-500 sm:size-[11rem]`}
                priority
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {profileOption ? (
              <div className="absolute top-0 flex h-[9rem] w-[9rem] flex-col items-center justify-center gap-3 rounded-[100%] border-[3px] border-solid border-p-700 bg-gray-800/55 sm:h-[11rem] sm:w-[11rem]">
                <span onClick={(e) => finallChange()} className="p-1 text-3xl">
                  <TbCaptureFilled className="text-green-500" />
                </span>
                {userData.profilePicUrl === profileImages.men ||
                userData.profilePicUrl === profileImages.women ? null : (
                  <span
                    onClick={(e) => deleteProfile()}
                    className="p-1 text-3xl"
                  >
                    <RiDeleteBin5Line className="text-red-600" />
                  </span>
                )}
                <span
                  onClick={(e) => setProfileOption(false)}
                  className="p-1 text-3xl"
                >
                  <MdKeyboardReturn className="text-p-500" />
                </span>
              </div>
            ) : null}
          </div>
          {isEditing && image && (
            <div className="absolute z-[11] bg-gray-900/50 py-3 sm:top-[10rem] md:top-[14rem]">
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
              <div className="flex flex-col items-center justify-center gap-3 px-2">
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
          <button
            onClick={(e) => signOutHandler()}
            className={`${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} hidden items-center gap-2 rounded-lg bg-red-500 px-2 py-1 font-medium text-white sm:flex`}
          >
            {t("Sign Out")}
            <RiLogoutCircleRLine className="text-2xl font-medium" />
          </button>
        </div>
        <div
          className={`${isEditing && image ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} flex flex-col items-center justify-center gap-4 sm:flex-row`}
        >
          <div className="gap-3 sm:flex sm:flex-col sm:justify-center">
            <button
              onClick={(e) => personalHandler()}
              className={`${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} flex place-items-center gap-2 rounded-lg bg-white bg-gradient-to-r from-white to-p-300 px-2 py-1 font-medium text-p-950 shadow-md shadow-p-300 sm:mt-2`}
            >
              {t("Personal Info")}
              {openPersonalModal ? (
                <RiArrowUpWideFill className="mt-1 text-2xl font-medium text-p-950 sm:hidden" />
              ) : (
                <RiArrowDownWideFill className="mt-1 text-2xl font-medium text-p-950 sm:hidden" />
              )}
            </button>
            <PersonalInfo
              userData={userData}
              locale={locale}
              openPersonalModal={openPersonalModal}
              setIsBlur={setIsBlur}
              isBlur={isBlur}
            />
          </div>
          <div className="gap-3 sm:flex sm:flex-col sm:justify-center">
            <button
              onClick={(e) => loginHandler()}
              className={`${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} flex place-items-center gap-2 rounded-lg bg-white bg-gradient-to-r from-white to-p-300 px-2 py-1 font-medium text-p-950 shadow-md shadow-p-300 sm:justify-center`}
            >
              {t("Login Info")}
              {openLoginModal ? (
                <RiArrowUpWideFill className="mt-1 text-2xl font-medium text-p-950 sm:hidden" />
              ) : (
                <RiArrowDownWideFill className="mt-1 text-2xl font-medium text-p-950 sm:hidden" />
              )}
            </button>
            <LoginInfo
              locale={locale}
              userData={userData}
              openPersonalModal={openLoginModal}
              setIsBlur={setIsBlur}
              isBlur={isBlur}
            />
          </div>
        </div>
        <button
          onClick={(e) => signOutHandler()}
          className={`${isBlur ? "pointer-events-none blur-sm" : "pointer-events-auto blur-none"} flex items-center gap-2 rounded-lg bg-red-500 px-2 py-1 font-medium text-white sm:hidden`}
        >
          {t("Sign Out")}
          <RiLogoutCircleRLine className="text-2xl font-medium" />
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default ProfileDetail;
