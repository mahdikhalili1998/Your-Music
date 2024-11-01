import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userInfo from "@/model/userInfo";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("id");
    const user = await userInfo.findOne({ email: userEmail });
    // console.log(user);
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: user },
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
