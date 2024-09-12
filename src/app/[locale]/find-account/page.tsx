import FindAccountPage from "@/components/template/FindAccountPage";
import { IParams } from "@/types/props";
import React from "react";

function page({ params: { locale } }: IParams) {
  return <FindAccountPage locale={locale}  />;
}

export default page;
