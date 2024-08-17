import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { regexInfo } from "@/constant/regex";
import { hashPassword } from "@/utils/nextPass";

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const { changePass } = await req.json();
    const { password, phone } = changePass;

    const user = await userInfo.findOne({ phoneNumber: changePass.phone });
    // console.log(user);
    if (!password || !phone) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }
    if (!regexInfo.password.test(password)) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }
    if (!user) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND },
      );
    }
    const hashPass = hashPassword(password);
    user.password = hashPass;
    user.save();
    return NextResponse.json(
      { message: MESSSGE.PASS_CHANGE },
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
