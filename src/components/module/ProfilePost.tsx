"use client";
import { IProfilePost } from "@/types/props";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";

const ProfilePost: FC<IProfilePost> = ({ user }) => {
  const [posts, setPosts] = useState<any[]>(null);
  const [noPost, setNoPost] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const E = useTranslations("enum");

  console.log(posts);
  useEffect(() => {
    const dataFetcher = async () => {
      setLoader(true);
      await axios
        .get(`/api/get-post?id=${user._id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setPosts(res.data.data);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            toast.error(E("Error in sending request"));
          } else if (error.response.status === 403) {
            toast.error(E("Can Not Find User"));
          } else if (error.response.status === 204) {
            setNoPost(true);
          }
        });
    };
    dataFetcher();
  }, []);
  return (
    <div>
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat</h2>
      <Toaster />
    </div>
  );
};

export default ProfilePost;
