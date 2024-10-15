import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userPost from "@/model/userPost";

export async function PATCH(req: NextRequest) {
  try {
    await ConnectDB();
    const {
      data: { id, postId },
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: MESSSGE.UNATHOURISED },
        { status: STATUS.UNATHOURISED },
      );
    }
    const findPost = await userPost.findOne({ _id: postId });

    const index = findPost.userLikeId.indexOf(id);
    if (index !== -1) {
      findPost.userLikeId.splice(index, 1);
      findPost.save();
    } else {
      findPost.userLikeId.push(id);
      findPost.save();
    }

    return NextResponse.json(
      { message: MESSSGE.INFO_CHANGE },
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
