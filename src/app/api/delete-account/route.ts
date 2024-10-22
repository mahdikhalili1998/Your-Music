import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import userPost from "@/model/userPost";
import { getServerSession } from "next-auth";

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();
    const userLogInfo = await getServerSession(req);
    const user = await userInfo.findOne({ email: userLogInfo.user.email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: MESSSGE.USER_NOT_FOUND },
        { status: STATUS.NOT_FOUND },
      );
    }

    // حذف کاربر
    await userInfo.deleteOne({ email: userLogInfo.user.email });

    // حذف پست‌های مرتبط با کاربر
    await userPost.deleteMany({ userId: user._id });

    return NextResponse.json(
      { message: MESSSGE.DELETE_ACCOUNT },
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
