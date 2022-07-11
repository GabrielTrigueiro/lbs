import { Add } from "@mui/icons-material";
import { Box, Typography, Button, Grid, Icon } from "@mui/material";
import { SearchInput } from "../../shared/components/search";
import { LayoutBasePage } from "../../shared/layouts";

export const ProviderListPage: React.FC = () => {
  return (
    <LayoutBasePage>
      <Box
        justifyContent={"space-between"}
        padding={0}
        display="flex"
        alignItems="center"
      >
        <Typography
          sx={{ margin: "40px 0px", fontWeight: 600, fontSize: "40px" }}
        >
          {"Fornecedores"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ height: "50px", color: "black" }}
        >
          Cadastrar Fornecedores
        </Button>
      </Box>

      <Box margin="0px" display="flex">
        <Grid display="flex" direction="row" container flex={1}>
          <Grid display={"flex"} sx={{ borderBottom: "4px solid #E4DB00" }}>
            <Typography variant="h5">Lista de Fornecedores</Typography>
            <Box position={"relative"} bottom={3}>
              <SearchInput />
            </Box>
          </Grid>
          <Grid
            justifyContent="flex-end"
            display="flex"
            flex={1}
            sx={{ borderBottom: "3px solid #D9D9D9" }}
          ></Grid>
        </Grid>
        <Box flexDirection="row" display="flex" gap={10}></Box>
      </Box>
    </LayoutBasePage>
  );
};
