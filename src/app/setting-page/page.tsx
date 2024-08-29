import SettingPage from "@/components/template/SettingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function page() {
  const session = await getServerSession(authOptions);
  return <SettingPage session={session} />;
}

export default page;
