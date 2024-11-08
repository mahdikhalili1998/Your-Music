import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import { getServerSession } from "next-auth";
import userInfo from "@/model/userInfo";
import userPost from "@/model/userPost";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      data: { cutAudioUrl, description },
    } = await req.json();
    if (!cutAudioUrl || !description) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { message: MESSSGE.UNATHOURISED },
        { status: STATUS.WRONG_PASS },
      );
    }
    const user = await userInfo.findOne({ email: session?.user.email });
    const result = await userPost.create({
      profilePicUrl: user.profilePicUrl,
      userName: user.userName,
      userLikeId: [],
      comment: [],
      description,
      musicUrl: cutAudioUrl,
      userId: new Types.ObjectId(user._id),
    });
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS },
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

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();
    const result = await req.json();
    const userPosted = await userPost.deleteOne({ _id: result.id });
    // console.log(userPosted);
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS },
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

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      data: { text, id },
    } = await req.json();
    const findPost = await userPost.findOne({ _id: id });
    findPost.description = text;
    findPost.save();
    return NextResponse.json(
      { message: MESSSGE.INFO_CHANGE },
      { status: STATUS.EDIT_INFO },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}
