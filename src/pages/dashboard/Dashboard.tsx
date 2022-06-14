import { FerramentasDeDetalhe, TableClients } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { Box, Divider, Icon, Typography, Tab } from "@mui/material";
import { border } from "@mui/system";
import TableClients2 from "../../shared/components/table-clients/TableClients2"

export const Dashboard = () => {
  return (
    <LayoutBasePage titulo="Clientes" nameButton="Cadastrar clientes">
      <Box margin="10px" display="flex">
        <Box flex={1}>
          <Typography variant="h5">Lista de Clientes</Typography>
        </Box>
        <Box flexDirection="row" display="flex" gap={10} marginRight="20px">
          <Box flexDirection="row" display="flex" gap={1}>
            <Icon color="success">circle</Icon>
            <Typography variant="subtitle1">Ativo</Typography>
          </Box>
          <Box flexDirection="row" display="flex" gap={1}>
            <Icon color="error">circle</Icon>
            <Typography variant="subtitle1">Inativo</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <TableClients/>
      </Box>
    </LayoutBasePage>
  );
};
