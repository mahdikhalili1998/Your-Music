import AddPostPage from "@/components/template/AddPostPage";
import { IParams } from "@/types/props";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/profile`);

  return <AddPostPage locale={locale} />;
}

export default page;
