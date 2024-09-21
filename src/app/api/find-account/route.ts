import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const number = req.nextUrl.searchParams.get("number");
    // const {data}=await req.json()
    // console.log(number);
    if (!number) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    const user = await userInfo.findOne({ phoneNumber: number });
    // console.log(user);

    if (!user) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND2 },
      );
    }

    return NextResponse.json(
      {
        message: MESSSGE.SUCCSESS,
        userData: user,
      },
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
