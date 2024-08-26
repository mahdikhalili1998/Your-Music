import { IUserInfo } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

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
  },
  { timestamps: true },
);

const userInfo =
  models.yourMusicUserInfo || model<IUserInfo>("yourMusicUserInfo", userSchema);

export default userInfo;
