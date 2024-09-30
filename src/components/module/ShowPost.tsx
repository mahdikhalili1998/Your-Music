"use client";

import { IShowPost } from "@/types/props";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useTranslations } from "next-intl";
import { p2e } from "@/helper/replaceNumber";
import { AiFillDelete } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import isPersian from "@/helper/LanguageRecognizer";
import Loader from "./Loader";
import momentJalaali from "moment-jalaali";

const ShowPost: FC<IShowPost> = ({ post, info, user, locale }) => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [likeState, setLikeState] = useState<{ [key: string]: boolean }>({});
  const [likeCount, setLikeCount] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const jalaliDate = momentJalaali(post.createAt).format("jYYYY/jMM/jDD");
  const [profPic, setProfPic] = useState<string>("");
  const reversedPost = post.toReversed();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const t = useTranslations("showPostPage");
  const E = useTranslations("enum");
  momentJalaali.loadPersian({ usePersianDigits: true });

  useEffect(() => {
    const result = post.map((item) => {
      setLikeCount((prevState) => ({
        ...prevState,
        [item._id]: item.likeCount,
      }));
      setLikeState((prevState) => ({
        ...prevState,
        [item._id]: item.likeSituation,
      }));
    });
    const prof = info.map((infoo) => {
      post.map((item) => {
        if (infoo._id === item.userId) {
          setProfPic(infoo.profilePicUrl);
        }
      });
    });
  }, [post, info]);

  const likeHandler = async (_id: string) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [_id]: true, // تنظیم لودینگ برای پست خاص
    }));
    try {
      const response = await axios.patch("/api/upload", {
        data: [likeCount[_id], !likeState[_id], _id],
      });
      if (response.status === 201) {
        setLikeState((prevState) => ({
          ...prevState,
          [_id]: !likeState[_id],
        }));
        setLikeCount((prevCount) => ({
          ...prevCount,
          [_id]: likeState[_id] ? prevCount[_id] - 1 : prevCount[_id] + 1,
        }));
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [_id]: false, // تنظیم لودینگ به false بعد از دریافت پاسخ
      }));
    }
  };

  const deleteHandler = async (id: string) => {
    await axios
      .delete("/api/upload", { data: { id: id } })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {reversedPost.map((item) => (
        <div
          key={item._id}
          className={`${locale === "fa" ? "directon-ltr font-iransans" : null} mx-1 mt-4 flex flex-col gap-5 border-b-2 border-solid border-gray-400 pb-4 md:mx-10 lg:mx-20`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={item.profilePicUrl}
                alt="profilePicture"
                width={300}
                height={300}
                priority
                className="size-[4rem] rounded-[100%] border-2 border-solid border-p-700"
              />
              <span className="font-medium text-p-950">{item.userName}</span>
            </div>
            <div className="relative">
              <SlOptionsVertical
                className="-mt-1"
                onClick={() =>
                  setActivePostId(activePostId === item._id ? null : item._id)
                }
              />
              <div
                ref={(el) => (refs.current[item._id] = el)}
                className={`${
                  activePostId !== item._id ? "hidden" : "absolute right-1"
                } ${locale === "fa" ? "px-6" : null} z-10 flex flex-col items-start justify-center gap-2 rounded-lg bg-gray-300 p-2 px-4 font-medium`}
              >
                {!user ? null : user.userName === item.userName ? (
                  <span
                    onClick={() => deleteHandler(item._id)}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <AiFillDelete /> {t("delete")}
                  </span>
                ) : null}
                <a
                  href={item.musicUrl}
                  className="flex w-max items-center gap-2"
                >
                  <LuDownload /> {t("download")}
                </a>
              </div>
            </div>
          </div>
          <audio controls className="mx-2 mb-4 w-full 350:mx-auto 350:w-64">
            <source src={item.musicUrl} type="audio/mp3" />
          </audio>
          <div className="flex items-center gap-4">
            {loading[item._id] ? ( // نمایش لودر فقط برای پست در حال لایک شدن
              <div>
                <Loader color="#020617" width={40} height={20} />
              </div>
            ) : (
              <span
                onClick={() => likeHandler(item._id)}
                className="flex items-center gap-2"
              >
                {likeState[item._id] ? (
                  <FaHeart className="text-xl text-red-600" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
                {likeCount[item._id]}
              </span>
            )}
            <span>
              <FaRegComment className="text-xl" />
            </span>
          </div>
          <p
            className={`${
              isPersian(item.description) ? "font-iransans" : "font-Roboto"
            } font-medium text-p-950`}
          >
            {item.description}
          </p>
          <p className="-mt-4 text-xs font-medium text-gray-600">
            {locale === "fa"
              ? jalaliDate
              : p2e(moment(post.createdAt).format("YYYY/MM/DD"))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
