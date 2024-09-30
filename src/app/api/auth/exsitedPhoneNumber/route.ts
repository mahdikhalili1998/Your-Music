import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";

import userInfo from "@/model/userInfo";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { data } = await req.json();
    // console.log(data);
    const existedPhoneNumber = await userInfo.findOne({ phoneNumber: data });

    if (!existedPhoneNumber) {
      return NextResponse.json(
        { message: MESSSGE.EXSITED_USER.replace("email", "phone number") },
        { status: STATUS.EXSITED_USER },
      );
    }

    if (existedPhoneNumber) {
      return NextResponse.json(
        {
          message: MESSSGE.SUCCSESS,
        },
        { status: STATUS.SUCCSESS },
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
