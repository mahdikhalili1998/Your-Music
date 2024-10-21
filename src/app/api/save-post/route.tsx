import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userPost from "@/model/userPost";
import { getServerSession } from "next-auth";
import userInfo from "@/model/userInfo";

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const { data } = await req.json();
    const isLogin = await getServerSession(req);
    if (!isLogin) {
      return NextResponse.json(
        { message: MESSSGE.UNATHOURISED },
        { status: STATUS.UNATHOURISED },
      );
    }
    const [findUser] = await userInfo.find({ email: isLogin.user.email });
    const findPost = await userPost.findOne({ _id: data });
    if (!findPost) {
      return NextResponse.json(
        { message: MESSSGE.NOT_POST_FOUNDED },
        { status: STATUS.NOT_FOUND2 },
      );
    }
    const index = findUser.savePost.indexOf(data);
    if (index !== -1) {
      findUser.savePost.splice(index, 1);
      findUser.save();
    } else {
      findUser.savePost.push(data);
      findUser.save();
    }
    return NextResponse.json(
      { message: MESSSGE.INFO_CHANGE },
      { status: STATUS.EDIT_INFO },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { messge: MESSSGE.SERVER_ERROR },
      { status: STATUS.ERROR },
    );
  }
}
