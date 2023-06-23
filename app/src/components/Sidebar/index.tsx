"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Warehouse,
  Dataset,
} from "@mui/icons-material";
import { bblogo } from "@/assets/images";
import { TSidebar, TMenuList } from "./types";
import { DrawerContainer } from "./elements";

function Sidebar({ open, onClose }: TSidebar) {
  const [toggleCollapse, setToggleCollapse] = useState<Record<number, boolean>>(
    {}
  );
  const menuList: TMenuList[] = [
    {
      link: "/reports",
      main: { title: "Reports", icon: <Dataset /> },
    },
    {
      link: "/#",
      main: { title: "Warehouse", icon: <Warehouse /> },
      options: [
        {
          link: "/temperature/bb05",
          title: "BB05",
          icon: <Warehouse />,
        },
        {
          link: "/temperature/bb06",
          title: "BB06",
          icon: <Warehouse />,
        },
      ],
    },
  ];
  const router = useRouter();

  const onNavigate = (route?: string) => {
    if (route) {
      router.push(route);
    }
  };

  const onToggleCollapse = (idx: number, isToggle: boolean = true) => {
    setToggleCollapse((prev) => {
      if (!prev[idx]) {
        return { ...prev, [idx]: isToggle };
      }
      return { ...prev, [idx]: !isToggle };
    });
  };

  const nestedMenu = () => {
    return (
      menuList &&
      menuList.map(({ link, main, options }, idx) => (
        <Fragment key={idx}>
          <ListItem>
            <ListItemButton
              onClick={
                options
                  ? () => onToggleCollapse(idx, open)
                  : () => onNavigate(link)
              }
            >
              {main.icon ? <ListItemIcon>{main.icon}</ListItemIcon> : null}
              <ListItemText primary={main.title} />
              {options ? (
                toggleCollapse[idx] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>
          </ListItem>

          {options &&
            options.map((option) => (
              <Collapse
                key={option.title}
                in={toggleCollapse[idx]}
                timeout="auto"
                unmountOnExit
              >
                <ListItem>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => onNavigate(option.link)}
                    >
                      {option.icon ? (
                        <ListItemIcon>{option.icon}</ListItemIcon>
                      ) : null}
                      <ListItemText primary={option.title} />
                    </ListItemButton>
                  </List>
                </ListItem>
              </Collapse>
            ))}
        </Fragment>
      ))
    );
  };

  return (
    <DrawerContainer variant="temporary" open={open} onClose={onClose}>
      <List
        sx={{ paddingY: "16px" }}
        subheader={
          <ListSubheader>
            <Image
              src={bblogo}
              alt="BBLC"
              width={200}
              style={{ borderRadius: 5 }}
            />
          </ListSubheader>
        }
      >
        {nestedMenu()}
      </List>
    </DrawerContainer>
  );
}

export default Sidebar;
