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
    likeSituation:{type:Boolean,default:false}
  },
  { timestamps: true },
);

const userPost =
  models.yourMusicuserPost ||
  model<IUserPostModel>("yourMusicuserPost", userPostSchema);

export default userPost;
