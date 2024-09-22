import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import { getServerSession } from "next-auth";
import userInfo from "@/model/userInfo";
import userPost from "@/model/userPost";
import { Types } from "mongoose";

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
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND2 },
      );
    }
    const user = await userInfo.findOne({ email: session?.user.email });
    const result = await userPost.create({
      profilePicUrl: user.profilePicUrl,
      userName: user.userName,
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
