import { ReactNode } from "react";
import { WithId } from "mongodb";

export type TLayout = {
  menuList: WithId<{ name: string; tag_id: string }>[];
  children: ReactNode;
};
