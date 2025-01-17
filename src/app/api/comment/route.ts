import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userPost from "@/model/userPost";
import { getServerSession } from "next-auth";
import userInfo from "@/model/userInfo";
import userComment from "@/model/comment";
import mongoose, { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const commenterDetail = await getServerSession(req);
    const user = await userInfo.findOne({ email: commenterDetail.user.email });
    const {
      data: { commentText, id },
    } = await req.json();

    if (!commentText) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    if (!id || !commenterDetail || !user) {
      return NextResponse.json(
        { message: MESSSGE.UNATHOURISED },
        { status: STATUS.UNATHOURISED },
      );
    }

    const result = await userComment.create({
      profilePicUrl: user.profilePicUrl,
      userName: user.userName,
      comment: commentText,
      postId: new Types.ObjectId(id),
      userId: new Types.ObjectId(user._id),
    });

    // console.log(commentText);

    const comment = await userComment.find({ postId: id });

    const post = await userPost.findOne({ _id: id });

    comment.forEach((item) => {
      const exists = post.comment.some(
        (existingComment) =>
          existingComment._id.toString() === item._id.toString(),
      );
      if (!exists) {
        post.comment.push(item);
      }
    });
    post.save();
    // console.log(post);

    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: post },
      { status: STATUS.SUCCSESS },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");
    const post = await userPost.findOne({
      _id: new mongoose.Types.ObjectId(postId),
    });
  
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: post },
      { status: STATUS.SUCCSESS },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}
