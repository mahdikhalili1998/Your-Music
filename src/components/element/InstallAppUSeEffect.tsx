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
    if (typeof window !== "undefined") {
      const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setPrompt(e);
      };

      // بررسی نصب بودن اپلیکیشن
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setShowInstallModal(true);
      }

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt,
        );
      };
    }
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
