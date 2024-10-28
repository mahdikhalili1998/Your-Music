import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userPost from "@/model/userPost";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND2 },
      );
    }

    const userPosts = await userPost.find({ userId });
    // console.log(searchParams);
    if (userPosts.length === 0) {
      return NextResponse.json(
        { message: MESSSGE.NOT_POST_FOUNDED },
        { status: STATUS.NOT_FOUND },
      );
    }

    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: userPosts },
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
export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { data } = await req.json();
    const post = await userPost.findOne({ _id: data });
    if (!post) {
      return NextResponse.json(
        { message: MESSSGE.NO_POST },
        { status: STATUS.NOT_FOUND2 },
      );
    }
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
