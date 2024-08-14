import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { regexInfo } from "@/constant/regex";
import { verifyPassword } from "@/utils/nextPass";

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      editedInfo: { email, userName, updatedAt, _id },
      password,
    } = await req.json();
    const user = await userInfo.findOne({ _id });
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          message: MESSSGE.INCORRECT_PASSWORD,
        },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    if (!email || !userName) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }
    if (!regexInfo.email.test(email) || !regexInfo.userName.test(userName)) {
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
    user.email = email;
    user.userName = userName;
    user.updatedAt = updatedAt;
    user.save();
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS },
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
