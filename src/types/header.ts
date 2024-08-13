import { Dispatch, SetStateAction } from "react";

export interface Iheader {
  header: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: Function;
}
