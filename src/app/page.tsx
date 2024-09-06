import { redirect } from "next/navigation";
import React from "react";

function RootPage() {
  redirect("/en");
}

export default RootPage;
