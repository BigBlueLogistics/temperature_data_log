import { Unstable_Grid2 as Grid, Box } from "@mui/material";
import { Warehouse } from "@mui/icons-material";
import { Wrapper, Title } from "./elements";
import { TPropsWarehouseItem } from "./types";

function WarehouseItem({ name, onNavigate }: TPropsWarehouseItem) {
  return (
    <Grid key={name} xs={12} sm={5.5} md={3.7} lg={2.75}>
      <Wrapper onClick={onNavigate}>
        <Title>{name}</Title>
        <Box
          sx={({ typography: { pxToRem }, breakpoints }) => ({
            [breakpoints.up("xs")]: {
              fontSize: pxToRem(60),
            },
            [breakpoints.up("md")]: {
              fontSize: pxToRem(80),
            },
            [breakpoints.up("xl")]: {
              fontSize: pxToRem(100),
            },
          })}
        >
          <Warehouse fontSize="inherit" htmlColor="#fffffff2" />
        </Box>
      </Wrapper>
    </Grid>
  );
}

export default WarehouseItem;
