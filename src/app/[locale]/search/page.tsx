import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { IParams } from "@/types/props";
import SearchPage from "@/components/template/SearchPage";

async function Page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/profile`);
  return <SearchPage locale={locale} />;
}

export default Page;
