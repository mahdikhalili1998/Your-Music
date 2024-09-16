import { IUserPostModel } from "@/types/model";
import { model, models, Schema } from "mongoose";
import  userInfo  from "@/model/userInfo";

const userPostSchema = new Schema<IUserPostModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: userInfo },
    description: { type: String, required: false },
    musicUrl: { type: String, required: true },
  },
  { timestamps: true },
);

const userPost =
  models.yourMusicuserPost ||
  model<IUserPostModel>("yourMusicuserPost", userPostSchema);

export default userPost;
