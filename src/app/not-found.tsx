"use client";
import Loader from "@/components/module/Loader";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFoundPage = () => {
  const router = useRouter();
  const result = useParams();
  console.log(result);
  useEffect(() => {
    router.push("/en/notFound");
  }, []);

  return (
    <div className="w-max mx-auto ">
      <Loader color="#7e22ce" width={180} height={100} />
    </div>
  );
};

export default NotFoundPage;
