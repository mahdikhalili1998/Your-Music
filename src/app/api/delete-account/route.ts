import { MESSSGE, STATUS } from "@/enums/enum";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();
    const { email } = await req.json();
    console.log(email);
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
