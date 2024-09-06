import SignUpPage from "@/components/template/SignUpPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { IParams } from "@/types/props";

async function page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (session) redirect(`/${locale}/profile`);

  return <SignUpPage locale={locale} />;
}

export default page;
