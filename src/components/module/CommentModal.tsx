"use client";
import { ICommentModal } from "@/types/props";
import { FC, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import Image from "next/image";
import Link from "next/link";
import { p2e } from "@/helper/replaceNumber.js";
import moment from "moment";
import momentJalaali from "moment-jalaali";
import { useTranslations } from "next-intl";
import isPersian from "@/helper/LanguageRecognizer";
import { IoIosArrowRoundBack } from "react-icons/io";

const CommentModal: FC<ICommentModal> = ({ locale, postId }) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<any>(null);
  const router = useRouter();
  const t = useTranslations("CommentModal");
  momentJalaali.loadPersian({ usePersianDigits: true });

  useEffect(() => {
    const commentFetcher = async () => {
      if (postId) {
        await axios
          .get("/api/comment", { params: { id: postId } })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              setComments(null);
              setComments(res.data.data);
            }
          })
          .catch((error) => console.log(error));
      }
    };
    commentFetcher();
  }, []);

  const sendCommentHandler = async () => {
    await axios
      .post("/api/comment", {
        data: { commentText, id: postId },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setCommentText("");
          setComments(res.data.data);
          router.refresh();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          toast.error("can not send empty comment ");
        } else if (error.response.data === 401) {
          toast.error("plaese sign in/up");
          router.push(`/${locale}/profile`);
        }
      });
  };

  return (
    <div className="max-h-[43rem] overflow-y-scroll">
      <IoIosArrowRoundBack
        onClick={(e) => router.back()}
        className={`${locale === "fa" ? "mr-auto" : "mr-auto"} -mt-2 mb-6 text-5xl text-p-700`}
      />
      <div className="gsp-3 mx-auto mb-10 flex w-max items-center justify-between rounded-lg border-2 border-solid border-p-700 px-2">
        <input
          type="text"
          value={commentText}
          placeholder={locale === "fa" ? "  ... درج کامنت " : "add comment ..."}
          className={` ${locale === "fa" ? "font-iransans" : "font-Roboto"} mr-2 rounded-xl px-3 py-2 text-center placeholder:text-center focus:outline-none`}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="disabled:opacity-40"
          disabled={!commentText}
          onClick={(e) => sendCommentHandler()}
        >
          <IoIosAddCircle className="text-3xl text-blue-700" />
        </button>
      </div>

      {!comments ? (
        <div className="mx-auto w-max">
          <Loader color="#7e22ce" width={80} height={40} />
        </div>
      ) : comments.comment.length === 0 ? (
        <h2
          className={`${locale === "fa" ? "directon-rtl" : "directon-ltr"} text-center`}
        >
          {t("NoComment")}
        </h2>
      ) : (
        comments?.comment.map((item) => (
          <div className="mx-3 mb-3 pb-3" key={item._id}>
            <Link
              href={`/${locale}/userPage/${item.userId}`}
              className="flex items-center gap-3"
            >
              <Image
                src={item.profilePicUrl}
                alt="proflePhoto"
                priority
                width={200}
                height={200}
                className="size-[3rem] rounded-[100%] border-[3px] border-solid border-p-700"
              />
              <div className="flex flex-col">
                <span
                  className={`${locale === "fa" ? "font-iransans" : "font-Roboto"} text-p-950`}
                >
                  {item.userName}
                </span>
                <span className="text-xs text-gray-500">
                  {locale === "fa"
                    ? momentJalaali(item.createdAt).format("jYYYY/jMM/jDD")
                    : p2e(moment(item.createdAt).format("YYYY/MM/DD"))}
                </span>
              </div>
            </Link>
            <p
              className={`${isPersian(item.comment) ? "font-iransans" : "font-Roboto"} ${locale === "fa" ? "font-iransans" : "font-Roboto"} text-center text-p-700`}
            >
              {item.comment}
            </p>
          </div>
        ))
      )}
      <Toaster />
    </div>
  );
};

export default CommentModal;
