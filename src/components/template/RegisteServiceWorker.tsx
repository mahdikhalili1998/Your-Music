"use client";

import { useEffect } from "react";

function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((res) => console.log("rigestreed sucessfully", res))
        .catch((err) => console.log(err));
    } else {
      console.log("not supported sw");
    }
  }, []);
  return null;
}

export default RegisterServiceWorker;
