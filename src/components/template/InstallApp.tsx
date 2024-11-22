"use client";
import { IInstallApp } from "@/types/props";
import React, { FC } from "react";

const InstallApp: FC<IInstallApp> = ({
  showInstallModal,
  closeModal,
  installhandler,
  locale,
}) => {
  return (
    showInstallModal && (
      <div className="flex flex-col text-black">
        <button onClick={(e) => installhandler()}>install</button>
        <button onClick={(e) => closeModal()}> close</button>
      </div>
    )
  );
};

export default InstallApp;
