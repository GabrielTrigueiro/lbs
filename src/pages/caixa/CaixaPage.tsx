import { Box } from "@mui/material";
import { CodeImputField } from "./CodeImputField";
import { CaixaList } from "./CaixaList";

export const CaixaPage = () => {

  return (
    <div 
      className="
        w-full
        h-full
        py-10 
        gap-10 
        flex
      "
    >

      {/* lista */}
      <div
        className="
          flex-grow 
          flex
          flex-col
          gap-5
        "
      >
        <div className="bg-white">
          <CodeImputField />
        </div>
        <div className="bg-white flex-grow overflow-y-scroll">
          <CaixaList />
        </div>
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