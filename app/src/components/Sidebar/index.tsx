"use client";

import { useRouter } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { TSidebar } from "./types";
import { DrawerContainer } from "./elements";

function Sidebar({ menuList, open, onClose }: TSidebar) {
  const router = useRouter();

  const onNavigate = (whTag: string) => {
    console.log("Navigation clickedddddd", whTag);
    router.push(`/temperature/${whTag}`);
  };

  return (
    <DrawerContainer variant="temporary" open={open} onClose={onClose}>
      <List>
        {menuList.map((wh) => (
          <ListItem key={wh.tag_id}>
            <ListItemButton onClick={() => onNavigate(wh.tag_id)}>
              <ListItemText>{wh.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
}

export default Sidebar;
