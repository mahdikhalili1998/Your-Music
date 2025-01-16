"use client";
import { ILocale } from "@/types/props";
import { FC, useEffect, useState } from "react";
import InstallApp from "../template/InstallApp";
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}
const InstallAppUSeEffect: FC<ILocale> = ({ locale }) => {
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      if (window.matchMedia("(display-mode:standalone)").matches) {
        return;
      } // اگر نصب شده، از هندل ادامه نمی}
      e.preventDefault();
      setPrompt(e);
      setShowInstallModal(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const installhandler = () => {
    if (prompt) {
      prompt.prompt(); // درخواست نصب PWA
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed successfully.");
        } else {
          console.log("PWA installation dismissed.");
        }
        setPrompt(null); // مقداردهی مجدد به null پس از نصب
        setShowInstallModal(false); // بستن مودال نصب
      });
    } else {
      console.error("Prompt is not available.");
      setShowInstallModal(false);
    }
  };

  const closeModal = () => {
    setShowInstallModal(false);
  };

  return (
    <InstallApp
      showInstallModal={showInstallModal}
      closeModal={closeModal}
      installhandler={installhandler}
      locale={locale}
    />
  );
};

export default InstallAppUSeEffect;
