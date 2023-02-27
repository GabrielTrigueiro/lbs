import { Skeleton, Stack } from "@mui/material";

export const ClientListPageSkeleton = () => {
  return (
      <Skeleton variant="rectangular" sx={{minHeight: "100%", maxHeight: "100%", borderRadius: 1}}/>
  );
};
