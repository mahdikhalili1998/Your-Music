import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB.js";
import userInfo from "@/model/userInfo";
export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const users = await userInfo.find();
    console.log(users);
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: users },
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
