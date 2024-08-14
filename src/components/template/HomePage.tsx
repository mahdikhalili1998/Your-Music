import React from "react";
import Welcome from "../module/Welcome";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import userInfo from "@/model/userInfo";
import ConnectDB from "@/utils/ConnectDB";

async function HomePage() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await userInfo.findOne({ email: session.user.email });
  console.log(user);
  return (
    <div>
      HomePage
      <Welcome user={user} />
    </div>
  );
}

export default HomePage;
