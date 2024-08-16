import SignInPage from "@/components/template/SignInPage";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/profile");

  return <SignInPage />;
}

export default page;
