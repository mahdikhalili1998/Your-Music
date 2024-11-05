"use client";
import { ICommentModal } from "@/types/props";
import { FC, useEffect, useState } from "react";
import { TbMenuOrder } from "react-icons/tb";
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

const CommentModal: FC<ICommentModal> = ({
  setShowComment,
  locale,
  postId,
  showComment,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<any>(null);

  momentJalaali.loadPersian({ usePersianDigits: true });

  // console.log(comments);
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
  }, [showComment]);

  const router = useRouter();

  const sendCommentHandler = async () => {
    await axios
      .post("/api/comment", {
        data: { commentText, id: postId },
      })
      .then((res) => {
        console.log(res);
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
    <div className="max-h-[43rem] space-y-12 overflow-y-scroll">
      <span
        onClick={(e) => setShowComment(false)}
        className="950:left-[10rem] fixed left-[4rem] block w-max 330:left-[2rem] 450:left-[5rem] 550:left-[7rem] sm:left-[4rem] md:left-[8rem] lg:left-[10rem] 2xl:left-[10rem]"
      >
        <TbMenuOrder className="m-2 w-[8rem] rounded-xl bg-p-300 text-3xl 330:w-[16rem] 400:w-[18rem]" />
      </span>

      <div className="gsp-3 mx-auto flex w-max items-center justify-between">
        <input
          type="text"
          value={commentText}
          placeholder={locale === "fa" ? "  ... درج کامنت " : "add comment ..."}
          className={` ${locale === "fa" ? "font-iransans" : "font-Roboto"} mr-2 rounded-xl px-3 py-2 placeholder:text-center focus:outline-p-500`}
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
      ) : (
        comments?.comment.map((item) => (
          <div className="mb-3 ml-3" key={item._id}>
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
                <span className="text-p-950">{item.userName}</span>
                <span className="text-xs text-gray-500">
                  {locale === "fa"
                    ? momentJalaali(item.createdAt).format("jYYYY/jMM/jDD")
                    : p2e(moment(item.createdAt).format("YYYY/MM/DD"))}
                </span>
              </div>
            </Link>
            <p className="text-center text-p-700"> {item.comment}</p>
          </div>
        ))
      )}
      <Toaster />
    </div>
  );
};

export default CommentModal;
