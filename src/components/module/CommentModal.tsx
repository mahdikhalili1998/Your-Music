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

const CommentModal: FC<ICommentModal> = ({
  setShowComment,
  locale,
  postId,
  showComment,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<any>(null);
  // console.log(comments);

  useEffect(() => {
    const commentFetcher = async () => {
      await axios
        .get("/api/comment", { params: { id: postId } })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setComments(null);
            setComments(res.data.data);
          }
        })
        .catch((error) => console.log(error));
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
    <div className="max-h-[43rem] space-y-8 overflow-y-scroll">
      <span
        onClick={(e) => setShowComment(false)}
        className="flex justify-center"
      >
        <TbMenuOrder className="m-2 w-80 rounded-xl bg-p-300 text-3xl" />
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
                className="size-[3rem] rounded-[100%]"
              />
              <span className="text-p-950">{item.userName}</span>
            </Link>
            <p className="text-center text-slate-700"> {item.comment}</p>
          </div>
        ))
      )}
      <Toaster />
    </div>
  );
};

export default CommentModal;
