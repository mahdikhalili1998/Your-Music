"use clinet";
import axios from "axios";
import { error } from "console";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../module/Loader";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import isPersian from "@/helper/LanguageRecognizer";
import momentJalaali from "moment-jalaali";
import { p2e } from "@/helper/replaceNumber";
import moment from "moment";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

function PostDetail() {
  const { locale, id } = useParams();
  const [detail, setDetail] = useState<any[]>([]);
  const [userLogInfo, setUserLogInfo] = useState<any>();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const t = useTranslations("showPostPage");
  const E = useTranslations("enum");
  const { data, status } = useSession();
  momentJalaali.loadPersian({ usePersianDigits: true });
  //   authenticated
  // console.log(status);
  useEffect(() => {
    const dataFetcher = async () => {
      await axios
        .post("/api/get-post", { data: id })
        .then((res) => {
          if (res.status === 200) {
            setDetail([res?.data?.data]);
          }
        })
        .catch((error) => console.log(error));
    };
    const getSesstion = async () => {
      if (status === "authenticated") {
        await axios
          .post("/api/search", { data: data.user.email })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              setUserLogInfo(res?.data?.data);
            }
          })
          .catch((error) => console.log(error));
      }
    };
    dataFetcher();
    getSesstion();
  }, []);

  const deleteHandler = async (id: string) => {
    await axios
      .delete("/api/upload", { data: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/${locale}/userPage/${detail[0]?.userId}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const likeHandler = async (id: string, postId: string) => {
    await axios
      .patch("/api/like", { data: { id, postId } })
      .then((res) => {
        if (res.status === 201) {
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  const savePostHandler = async (id: string) => {
    await axios
      .patch("/api/save-post", { data: id })
      .then((res) => {
        if (res.status === 201) {
          router.push(`/${locale}/userPage/${userLogInfo._id}`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`${locale === "fa" ? "directon-ltr font-iransans" : ""}`}>
      {!detail ? (
        <div className="mx-auto w-max">
          <Loader color="#7e22ce" width={120} height={70} />
        </div>
      ) : (
        detail?.map((item) => (
          <div
            key={item._id}
            className={`${locale === "fa" ? "directon-ltr font-iransans" : null} mx-1 flex flex-col pb-4 md:mx-10 lg:mx-20`}
          >
            <IoIosArrowRoundBack
              onClick={(e) => router.back()}
              className="-mt-2 text-5xl text-p-950"
            />
            <div className="flex items-center justify-between">
              <Link
                href={`/${locale}/userPage/${item.userId}`}
                className="flex items-center justify-start gap-3"
              >
                <Image
                  src={item.profilePicUrl}
                  alt="profilePicture"
                  width={300}
                  height={300}
                  priority
                  className="size-[4rem] rounded-[100%] border-2 border-solid border-p-700"
                />
                <span className="font-medium text-p-950">{item.userName}</span>
              </Link>
              <div className="relative">
                <SlOptionsVertical
                  className="-mt-1 mr-3"
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
                  {userLogInfo?._id === item.userId ? (
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
            <audio controls className="mx-2 my-8 w-full 350:mx-auto 350:w-64">
              <source src={item.musicUrl} type="audio/mp3" />
            </audio>
            {userLogInfo ? (
              <div className="flex items-center gap-4 pl-2">
                <span
                  onClick={() => likeHandler(userLogInfo._id, item._id)}
                  className="flex items-center gap-2"
                >
                  {item.userLikeId.includes(userLogInfo._id) ? (
                    <FaHeart className="text-xl text-red-600" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}

                  {item.userLikeId.length ? item.userLikeId.length : null}
                </span>
                <span>
                  <FaRegComment className="text-xl" />
                </span>
                <span onClick={() => savePostHandler(item._id)}>
                  {userLogInfo.savePost.includes(item._id) ? (
                    <FaBookmark className="text-xl" />
                  ) : (
                    <FaRegBookmark className="text-xl" />
                  )}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span
                  onClick={() => toast.error(t("sign in"))}
                  className="flex items-center gap-2"
                >
                  <FaRegHeart className="text-xl" />
                  {item.userLikeId.length}
                </span>
                <span onClick={() => toast.error(t("sign in"))}>
                  <FaRegComment className="text-xl" />
                </span>
              </div>
            )}
            <p
              className={`${
                isPersian(item.description) ? "font-iransans" : "font-Roboto"
              } m-2 mt-4 font-medium text-p-950`}
            >
              {item.description}
            </p>
            <p className="ml-2 mt-1 text-xs font-medium text-gray-600">
              {locale === "fa"
                ? momentJalaali(item.createdAt).format("jYYYY/jMM/jDD")
                : p2e(moment(item.createdAt).format("YYYY/MM/DD"))}
            </p>
          </div>
        ))
      )}
      <Toaster />
    </div>
  );
}

export default PostDetail;
