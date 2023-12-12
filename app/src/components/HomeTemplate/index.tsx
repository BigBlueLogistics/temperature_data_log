"use client";

import { useRouter } from "next/navigation";
import { Unstable_Grid2 as Grid, Typography, Box } from "@mui/material";
import WarehouseItem from "@/components/WarehouseItem";
import { TPropsHomeTemplate } from "./types";

export default function HomeTemplate({ warehouseList }: TPropsHomeTemplate) {
  const router = useRouter();

  const onNavigate = (route?: string) => {
    if (route) {
      router.push(`/temperature/${route}`);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="div"
        color="white"
        fontWeight="600"
        letterSpacing={2}
      >
        Warehouse
      </Typography>
      <Grid
        container
        columnGap={2}
        rowGap={2}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xs")]: {
            marginTop: 5,
          },
          [breakpoints.up("md")]: {
            marginTop: 10,
          },
        })}
      >
        {warehouseList && warehouseList.length ? (
          warehouseList.map(({ tag_id, name }) => (
            <WarehouseItem
              key={tag_id}
              name={name}
              onNavigate={() => onNavigate(tag_id)}
            />
          ))
        ) : (
          <Typography sx={{ color: "#c3c3c3" }} fontSize={20}>
            No data available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
