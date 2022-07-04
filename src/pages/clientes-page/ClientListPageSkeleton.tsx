import { Skeleton, Stack } from "@mui/material";

export const ClientListPageSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" sx={{marginTop:'200px', marginLeft:'120px'}} width={'1034px'} height={300} />
    </Stack>
  );
};
