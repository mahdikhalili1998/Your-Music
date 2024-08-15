import React from "react";
import Welcome from "../module/Welcome";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import userInfo from "@/model/userInfo";
import ConnectDB from "@/utils/ConnectDB";

async function HomePage() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  let user = null;
  if (session) {
    const dbUser = await userInfo.findOne({ email: session.user.email });

    user = {
      name: dbUser.name,
    };
  }

  // console.log(user);
  return (
    <div>
      HomePage
      {user ? <Welcome user={{ ...user }} /> : null}
    </div>
  );
}

export default HomePage;
