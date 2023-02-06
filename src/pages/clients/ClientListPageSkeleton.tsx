import { Skeleton, Stack } from "@mui/material";

export const ClientListPageSkeleton = () => {
  return (
    <Stack>
      <Skeleton variant="rectangular" sx={{minHeight: "60vh", maxHeight: "60vh", marginTop: 7, borderRadius: 1}}/>
    </Stack>
  );
};
