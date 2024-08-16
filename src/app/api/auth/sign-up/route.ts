import { MESSSGE, STATUS } from "@/enums/enum";
import { IUserInfo } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { hashPassword } from "@/utils/nextPass";
import userInfo from "@/model/userInfo";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      userInfo: { email, name, password, userName, phoneNumber },
    }: { userInfo: IUserInfo } = await req.json();

    if (!email || !name || !password || !userName || !phoneNumber) {
      return NextResponse.json(
        { message: MESSSGE.INCORRECT_INFO },
        { status: STATUS.INCORRECT_INFO },
      );
    }

    const hashPass = await hashPassword(password);

    const exsitedEmail = await userInfo.findOne({ email });
    const exsitedUserName = await userInfo.findOne({ userName });

    if (exsitedUserName && exsitedEmail) {
      return NextResponse.json(
        { message: MESSSGE.EXSITED_USER.replace("email", "userName & email") },
        { status: STATUS.EXSITED_USER },
      );
    }

    if (exsitedUserName) {
      return NextResponse.json(
        { message: MESSSGE.EXISTED_USER_NAME },
        { status: STATUS.EXSITED_USER },
      );
    }
    if (exsitedEmail) {
      return NextResponse.json(
        { message: MESSSGE.EXSITED_USER },
        { status: STATUS.EXSITED_USER },
      );
    }

    const newUser = await userInfo.create({
      name,
      userName: userName.toLowerCase(),
      password: hashPass,
      email: email.toLowerCase(),
      phoneNumber,
    });

    return NextResponse.json(
      { message: MESSSGE.WELCOME.replace("{name}", name.toUpperCase()) },
      { status: STATUS.SUCCSESS },
    );
  } catch (error) {
    return NextResponse.json(
      { message: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}
