import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userPost from "@/model/userPost";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    // console.log(searchParams);
    if (!userId) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND2 },
      );
    }
    const userPosts = await userPost.find({ userId });
    if (!userPosts) {
      return NextResponse.json(
        { message: MESSSGE.NO_POST },
        { status: STATUS.DELETE },
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
