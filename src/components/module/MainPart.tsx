"use client";

import { IMainPart } from "@/types/props";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const MainPart: FC<IMainPart> = ({ locale }) => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const getAllUser = async () => {
      await axios
        .get("/api/homePage")
        .then((res) => {
          if (res.status === 200) {
            setAllUser(res.data.data);
          }
        })
        .catch((error) => console.log(error));
    };
    getAllUser();
  }, []);
  return <div>{allUser?.map((item) => console.log(item))}</div>;
};

export default MainPart;
