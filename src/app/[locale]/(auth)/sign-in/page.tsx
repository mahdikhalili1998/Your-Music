import SignInPage from "@/components/template/SignInPage";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { IParams } from "@/types/props";

async function page({ params: { locale } }: IParams) {
  const session = await getServerSession(authOptions);
  if (session) redirect(`/${locale}/profile`);

  return <SignInPage locale={locale} />;
}

export default page;
