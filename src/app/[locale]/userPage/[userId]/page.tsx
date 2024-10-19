"use client";
import Loader from "@/components/module/Loader";
import UserDetail from "@/components/template/UserDetail";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
function Page() {
  const [user, setUser] = useState<any>(null);
  const { locale, userId } = useParams();
  // console.log(user);

  useEffect(() => {
    const userDetail = async () => {
      await axios
        .post("/api/find-account", { data: userId })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setUser(res?.data?.data);
          }
        })
        .catch((error) => console.log(error));
    };
    userDetail();
  }, []);

  return (
    <div>
      {!user ? (
        <div className="mt-[8rem] flex justify-center">
          <Loader color="#7e22ce" height={60} width={150} />
        </div>
      ) : (
        <UserDetail user={user} />
      )}
    </div>
  );
}

export default Page;
