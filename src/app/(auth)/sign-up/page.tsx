import SignUpPage from "@/components/template/SignUpPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");

  return <SignUpPage />;
}

export default page;
