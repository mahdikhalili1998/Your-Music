import ResetPasspage from "@/components/template/ResetPasspage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  return <ResetPasspage />;
}

export default page;
