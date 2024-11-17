"use client"; // مطمئن شوید که کد در سمت کلاینت اجرا می‌شود

import { useEffect } from "react";

export default function RegisterServiceWorker() {
  useEffect(() => {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("sw.js")
        .then(function () {
          console.log("service worker registered .");
        })
        .catch(function () {
          console.log("SW Errors .");
        });
    });
  }, []);

  return null; // این کامپوننت نیازی به رندر کردن چیزی ندارد
}
