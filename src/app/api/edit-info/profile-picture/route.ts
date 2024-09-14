import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userInfo from "@/model/userInfo";
import { profileImages } from "@/constant/image";

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

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();
    const [result] = await req.json();
    const { _id, gender } = result;
    // console.log({ _id, gender });
    const user = await userInfo.findOne({ _id }); //main account
    if (gender === "men") {
      user.profilePicUrl = profileImages.men;
      await user.save();
    } else if (gender === "women") {
      user.profilePicUrl = profileImages.women;
      await user.save();
    } else if (gender === "other") {
      user.profilePicUrl = profileImages.men;
      await user.save();
    }

    return NextResponse.json(
      { message: MESSSGE.DELETE },
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
