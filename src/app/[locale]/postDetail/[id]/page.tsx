"use client";
import { useParams } from "next/navigation";
function Page() {
  const { id } = useParams(); // گرفتن id از URL

  console.log(id);
  return <div>Page</div>;
}

export default Page;
