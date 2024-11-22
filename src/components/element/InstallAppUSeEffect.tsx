"use client";
import { ILocale } from "@/types/props";
import { FC, useEffect, useState } from "react";
import InstallApp from "../template/InstallApp";
import { IShowPost } from "@/types/props";

const InstallAppUSeEffect: FC<ILocale> = ({ locale }) => {
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPrompt(e);
    };

    // بررسی نصب بودن اپلیکیشن
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallModal(true);
      return;
    }

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
      prompt.prompt();
      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed successfully.");
        } else {
          console.log("PWA installation dismissed.");
        }
        setPrompt(null);
        setShowInstallModal(false);
      });
    }
  };

  const closeModal = () => {
    setShowInstallModal(false);
  };

  return (
    <>
      <InstallApp
        showInstallModal={showInstallModal}
        closeModal={closeModal}
        installhandler={installhandler}
        locale={locale}
      />
    </>
  );
};

export default InstallAppUSeEffect;
