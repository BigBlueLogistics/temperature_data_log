import { ModalProps } from "@mui/material";

export type TSidebar = {
  // menuList: { name: string; tag_id: string }[];
  open: boolean;
  onClose: ModalProps["onClose"];
};

export type TMenuList = {
  link?: string;
  main: {
    title: string;
    icon?: React.ReactNode;
  };
  options?:
    | {
        link: string;
        title: string;
        icon?: React.ReactNode;
      }[];
};
