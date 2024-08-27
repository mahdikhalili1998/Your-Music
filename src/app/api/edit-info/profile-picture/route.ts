import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userInfo from "@/model/userInfo";
export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();

    const {
      userData: { profilePicUrl, _id },
    } = await req.json();

    const user = await userInfo.findOne({ _id }); //main account
    user.profilePicUrl = profilePicUrl;
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
