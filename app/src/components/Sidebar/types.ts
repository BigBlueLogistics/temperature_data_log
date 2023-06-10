import { ModalProps } from "@mui/material";

export type TSidebar = {
  menuList: { name: string; tag_id: string }[];
  open: boolean;
  onClose: ModalProps["onClose"];
};
