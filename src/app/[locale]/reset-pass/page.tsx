import ResetPasspage from "@/components/template/ResetPasspage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { IParams } from "@/types/props";

async function page({ params: { locale } }: IParams) {
  return <ResetPasspage locale={locale} />;
}

export default page;
