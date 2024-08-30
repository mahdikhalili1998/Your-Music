import ResetPasspage from "@/components/template/ResetPasspage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/profile");
  return <ResetPasspage />;
}

export default page;
