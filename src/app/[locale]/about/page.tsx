import { IParams } from "@/types/props";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import About from "@/components/template/About";

async function Page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/profile`);
  return <About locale={locale} />;
}

export default Page;
