import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      data: { id, bio },
    } = await req.json();
    // console.log(id);
    const user = await userInfo.findOne({ _id: id });
    user.bio = bio;
    user.save();
    // console.log(user);
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
