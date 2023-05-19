import { Box } from "@mui/material";
import { CodeImputField } from "./CodeImputField";
import { CaixaList } from "./CaixaList";

export const CaixaPage = () => {

  return (
    <div
      className="
          py-4
          flex
          gap-5
          min-h-full
      "
    >
      {/* lista */}
      <div className="flex flex-col flex-grow gap-4">
        <CodeImputField />
        <CaixaList />
      </div>

      {/* infos */}
      <div className="flex-grow">
        <Box sx={{ background: "#fff" }}>1</Box>
        <Box sx={{ background: "#fff" }}>2</Box>
        <Box sx={{ background: "#fff" }}>
          Formas de pagamento
        </Box>
        <Box sx={{ background: "#fff" }}>
          Valor final e confirmar
        </Box>
      </div>
    </div>
  )
}