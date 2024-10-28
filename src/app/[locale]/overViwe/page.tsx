import { IParams } from "@/types/props";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OverViwePage from "@/components/template/OverViwePage";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";

async function Page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/profile`);
  await ConnectDB();
  const user = await userInfo.findOne({ email: session.user.email });

  return <OverViwePage locale={locale} user={user} />;
}

export default Page;
