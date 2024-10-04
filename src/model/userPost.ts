import { IUserPostModel } from "@/types/model";
import { model, models, Schema } from "mongoose";
import userInfo from "@/model/userInfo";

const userPostSchema = new Schema<IUserPostModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: userInfo },
    description: { type: String, required: false },
    musicUrl: { type: String, required: true },
    profilePicUrl: { type: String, required: true },
    userName: { type: String, required: true },
    likeCount: { type: Number, default: 0 },
    likeSituation: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }, // تاریخ ایجاد به صورت دستی
    updatedAt: { type: Date, default: Date.now() }, // تاریخ به‌روزرسانی به صورت دستی
  },
  {
    // حذف timestamps
    timestamps: false,
  },
);

// Middleware برای مدیریت دستی updateAt هنگام به‌روزرسانی
userPostSchema.pre("save", function (next) {
  const post = this as any;
  // در صورت جدید بودن سند، createdAt تنظیم می‌شود
  if (!post.createdAt) {
    post.createdAt = new Date();
  }
  // همیشه updatedAt هنگام ذخیره یا آپدیت، به روز می‌شود
  post.updatedAt = new Date();
  next();
});
const userPost =
  models.yourMusicuserPost ||
  model<IUserPostModel>("yourMusicuserPost", userPostSchema);

export default userPost;
