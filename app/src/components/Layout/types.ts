import { ReactNode } from "react";

export type TLayout = {
  menuList: { name: string; tag_id: string }[];
  children: ReactNode;
};
