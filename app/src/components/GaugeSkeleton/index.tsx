import { Box, Skeleton } from "@mui/material";

export default function GaugeSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="circular"
        width={200}
        height={200}
        sx={{ bgcolor: "grey.900" }}
      />
    </Box>
  );
}
