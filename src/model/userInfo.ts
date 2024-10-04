import { IUserInfo } from "@/types/model";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUserInfo>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    phoneNumber: { type: String, required: true },
    creditCardNumber: { type: String, required: true },
    gender: { type: String, required: true },
    profilePicUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }, // تاریخ ایجاد به صورت دستی
    updatedAt: { type: Date, default: Date.now() }, // تاریخ به‌روزرسانی به صورت دستی
  },
  { timestamps: false },
);

const userInfo =
  models.yourMusicUserInfo || model<IUserInfo>("yourMusicUserInfo", userSchema);

export default userInfo;
