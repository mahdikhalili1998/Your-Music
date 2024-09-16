"use client";

import { IMainPart } from "@/types/props";
import axios from "axios";
import Image from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import Loader from "./Loader";

const MainPart: FC<IMainPart> = ({ locale }) => {
  const [allUser, setAllUser] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  // console.log(allUser);
  useEffect(() => {
    const getAllUser = async () => {
      setLoader(true);
      await axios
        .get("/api/homePage")
        .then((res) => {
          if (res.status === 200) {
            setAllUser(res.data.data);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    };
    getAllUser();
  }, []);
  return (
    <div>
      {loader ? (
        <div className="mx-auto w-max">
          <Loader width={100} height={60} />
        </div>
      ) : (
        allUser.map((item) => (
          <Image
            src={item.profilePicUrl}
            width={300}
            height={300}
            alt="prof"
            priority
            className="size-24 rounded-[100%]"
          />
        ))
      )}
    </div>
  );
};

export default MainPart;
