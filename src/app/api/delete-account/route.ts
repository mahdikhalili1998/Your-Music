import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();
    const email = await req.json();
    const user = await userInfo.deleteOne({ email });
    console.log(email);
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
