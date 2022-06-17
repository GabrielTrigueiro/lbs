import { TableClients } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { Box, Icon, Typography, Grid, Stack, Pagination } from "@mui/material";

export const Dashboard = () => {

  return (
    <LayoutBasePage titulo="Clientes" nameButton="Cadastrar clientes">
      <Box margin="10px" display="flex">
        <Grid display="flex" direction="row" container flex={1}>
          <Grid sx={{ borderBottom: "4px solid #E4DB00" }}>
            <Typography variant="h5">Lista de Clientes</Typography>
          </Grid>
          <Grid
            justifyContent="flex-end"
            display="flex"
            flex={1}
            sx={{ borderBottom: "3px solid #D9D9D9" }}
          >
            <Box sx={{ mr: 2 }} flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#42FF00" }}>circle</Icon>
              <Typography variant="subtitle1">Ativo</Typography>
            </Box>
            <Box flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#FF5555" }}>circle</Icon>
              <Typography variant="subtitle1">Inativo</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box flexDirection="row" display="flex" gap={10}></Box>
      </Box>

      <Box sx={{ padding: 0 }}>
        <TableClients />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Stack>
          <Pagination count={4} variant="outlined" shape="rounded" />
        </Stack>
      </Box>
    </LayoutBasePage>
  );
};
