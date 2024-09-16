import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userPost from "@/model/userPost";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      data: { musicUrl, description },
    } = await req.json();
    // console.log(data);
    const newPost = await userPost.create({
      musicUrl,
      description,
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
