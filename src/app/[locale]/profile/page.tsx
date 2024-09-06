import ProfilePage from "@/components/template/ProfilePage";
import { IParams } from "@/types/props";
import React from "react";

function page({ params: { locale } }: IParams) {
  return <ProfilePage locale={locale} />;
}

export default page;
