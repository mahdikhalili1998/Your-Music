import SettingPage from "@/components/template/SettingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { IParams } from "@/types/props";

async function page({ params: { locale } }: IParams) {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await userInfo?.findOne({ email: session.user.email });
    return (
      <SettingPage
        locale={JSON.parse(JSON.stringify(locale))}
        session={JSON.parse(JSON.stringify(session))}
        user={JSON.parse(JSON.stringify(user))}
      />
    );
  } else {
    const user = "";
    return (
      <SettingPage
        locale={JSON.parse(JSON.stringify(locale))}
        session={JSON.parse(JSON.stringify(session))}
        user={JSON.parse(JSON.stringify(user))}
      />
    );
  }
}

export default page;
