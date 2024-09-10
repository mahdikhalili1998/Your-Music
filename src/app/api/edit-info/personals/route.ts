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
      editedInfo: { name, phoneNumber, _id, lastName },
      password,
    } = await req.json();

    const user = await userInfo.findOne({ _id }); //main account

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        {
          message: MESSSGE.INCORRECT_PASSWORD,
        },
        { status: STATUS.WRONG_PASS },
      );
    }

    if (
      !regexInfo.name.test(name) ||
      !regexInfo.lastName.test(lastName) ||
      !regexInfo.phoneNumber.test(phoneNumber)
    ) {
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

    if (
      name === user.name &&
      phoneNumber === user.phoneNumber &&
      lastName === user.lastName
    ) {
      return NextResponse.json(
        { message: MESSSGE.DUPLICATE_INFORMATION },
        { status: STATUS.EXSITED_INFO },
      );
    }
    user.phoneNumber = phoneNumber;
    user.name = name;
    user.lastName = lastName;
    await user.save();

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
