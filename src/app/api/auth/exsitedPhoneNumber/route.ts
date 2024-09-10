import { MESSSGE, STATUS } from "@/enums/enum";
import { IUserInfo } from "@/types/types";
import { addAbortListener } from "events";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";

import userInfo from "@/model/userInfo";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { phoneNumber } = await req.json();
    const existedPhoneNumber = await userInfo.findOne({ phoneNumber });
    // console.log(phoneNumber);
    if (existedPhoneNumber) {
      return NextResponse.json(
        {
          message: MESSSGE.EXSITED_USER.replace("email", "Phone Number"),
        },
        { status: STATUS.EXSITED_USER },
      );
    }
    if (!existedPhoneNumber) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}
