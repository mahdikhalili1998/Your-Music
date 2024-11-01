import { IUserCommentModel } from "@/types/model";
import { model, models, Schema } from "mongoose";
import userInfo from "@/model/userInfo";
import userPost from "./userPost";

const userCommentSchema = new Schema<IUserCommentModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: userInfo },
    postId: { type: Schema.Types.ObjectId, ref: userPost },
    profilePicUrl: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, requireed: true },
    createdAt: { type: Date, default: Date.now() }, // تاریخ ایجاد به صورت دستی
    updatedAt: { type: Date, default: Date.now() }, // تاریخ به‌روزرسانی به صورت دستی
  },
  {
    // حذف timestamps
    timestamps: false,
  },
);

const userComment =
  models.yourMusicuserComment ||
  model<IUserCommentModel>("yourMusicuserComment", userCommentSchema);

export default userComment;
