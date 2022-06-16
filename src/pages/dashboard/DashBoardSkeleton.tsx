import { Box, Skeleton } from "@mui/material";

export const DashBoardSkeleton = () => {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Skeleton height="100px" width="190px"></Skeleton>
          <Skeleton height="100px" width="210px"></Skeleton>
        </Box>
        <Skeleton height="100px" width="100%"></Skeleton>
        <Skeleton height="1200px" width="100%"></Skeleton>
      </>
    );
  };