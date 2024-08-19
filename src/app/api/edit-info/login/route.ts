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

    // console.log(email);
    const user = await userInfo.findOne({ _id }); //main account

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        {
          message: MESSSGE.INCORRECT_PASSWORD,
        },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    const exitedEmail = await userInfo.findOne({ email }); //exsited account with this email

    const existedUserName = await userInfo.findOne({ userName }); //exsited account with this userName

    // console.log(userUserName);

    if (!regexInfo.email.test(email) || !regexInfo.userName.test(userName)) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    if (exitedEmail && exitedEmail.email !== user.email) {
      return NextResponse.json(
        {
          message: MESSSGE.EXISTED_USER_NAME.replace("username", "email"),
        },
        { status: STATUS.EXSITED_INFO },
      );
    }

    if (existedUserName && existedUserName.userName !== user.userName) {
      return NextResponse.json(
        {
          message: MESSSGE.EXISTED_USER_NAME,
        },
        { status: STATUS.EXSITED_INFO },
      );
    }
    if (email === user.email && userName === user.userName) {
      return NextResponse.json(
        { message: MESSSGE.DUPLICATE_INFORMATION },
        { status: STATUS.EXSITED_INFO },
      );
    }

    if (!email || !userName) {
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

    user.email = email.toLowerCase();
    user.userName = userName.toLowerCase();
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
