import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import { MESSSGE, STATUS } from "@/enums/enum";
import userInfo from "@/model/userInfo";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const searchParams = req.nextUrl.searchParams;
    const searchValue = searchParams.get("searchValue");

    const user = await userInfo.find();

    const filteredUserNames = user
      ?.filter((item) => {
        return item.userName.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((item) => item.userName);

    const searchResult = await Promise.all(
      filteredUserNames.map(async (item) => {
        const foundedUserInfo = await userInfo.find({ userName: item });
        return foundedUserInfo;
      }),
    );
    const flattenedResults = searchResult.flat();

    // console.log(flattenedResults);

    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: flattenedResults },
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

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { data } = await req.json();
    console.log(data);
    const userinfoes = await userInfo.findOne({ email: data });
    return NextResponse.json(
      { message: MESSSGE.SUCCSESS, data: userinfoes },
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
