"use client";
import { ICommentModal } from "@/types/props";
import { FC, useState } from "react";
import { TbMenuOrder } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";

const CommentModal: FC<ICommentModal> = ({ post, setShowComment, locale }) => {
  const [commentText, setCommentText] = useState<string>("");
  return (
    <div>
      <span
        onClick={(e) => setShowComment(false)}
        className="flex justify-center"
      >
        <TbMenuOrder className="m-2 mr-5 w-80 rounded-xl bg-p-300 text-3xl" />
      </span>

      <div className="gsp-3 mx-auto mt-8 flex w-max items-center justify-between">
        <input
          type="text"
          placeholder={locale === "fa" ? "  ... درج کامنت " : "add comment ..."}
          className={` ${locale === "fa" ? "font-iransans" : "font-Roboto"} mr-2 rounded-xl px-3 py-2 placeholder:text-center focus:outline-p-500`}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <span>
          <IoIosAddCircle className="text-3xl text-blue-700" />
        </span>
      </div>
    </div>
  );
};

export default CommentModal;
