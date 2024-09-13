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
    if (dbUser) {
      user = {
        name: dbUser.name,
        profilePicUrl: dbUser.profilePicUrl,
      };
    } else {
      return null;
    }
  }
  return (
    <div>
      HomePage
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
        eos reprehenderit atque cupiditate voluptas impedit voluptatibus, facere
        repudiandae cumque?
      </p>
      {user ? <Welcome user={{ ...user }} /> : null}
    </div>
  );
}

export default HomePage;
