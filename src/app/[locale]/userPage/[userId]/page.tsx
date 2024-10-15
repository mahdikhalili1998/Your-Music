"use client";
import { useParams } from "next/navigation";
function Page() {
  const { userId } = useParams(); // گرفتن userId از URL
  console.log(userId);
  return <div>Page</div>;
}

export default Page;
