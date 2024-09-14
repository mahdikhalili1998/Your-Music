import ResetPasspage from "@/components/template/ResetPasspage";
import React from "react";

import { IParams } from "@/types/props";

async function page({ params: { locale } }: IParams) {
  return <ResetPasspage locale={locale} />;
}

export default page;
