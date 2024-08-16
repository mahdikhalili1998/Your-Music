import { Iheader } from "@/types/header";
import React, { FC } from "react";

const Footer: FC<Iheader> = ({ header, open, setOpen }) => {
  return (
    <div
      className={`${!open ? null : "pointer-events-none blur-sm"} relative transition-all duration-300`}
    >
      Footer
    </div>
  );
};

export default Footer;
