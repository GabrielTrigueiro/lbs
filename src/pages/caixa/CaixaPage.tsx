import { Box, TextField } from "@mui/material";
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
      <div className="w-1/4 flex flex-col gap-3">

        {/* infos */}
        <div className="bg-white flex flex-col items-center p-1">
          <div className="bg-gray-500 w-[180px] h-[180px] flex-none flex items-center justify-center">
            imagem
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <TextField autoComplete="off" label="Código" variant="standard" />
            <TextField autoComplete="off" label="Descrição" variant="standard" />
            <TextField autoComplete="off" label="Preço" variant="standard" />
            <TextField autoComplete="off" label="Cor" variant="standard" />
          </div>
        </div>
        <div className="bg-white flex gap-2 p-1">
          <TextField autoComplete="off" label="Indicações" variant="standard" />
          <TextField autoComplete="off" label="Cliente" variant="standard" />
          <TextField autoComplete="off" label="Vendedor" variant="standard" />
        </div>

        {/* pagamentos */}
        <div className="bg-rose-200 flex-grow">
          pagamento
        </div>

        {/* finalizar */}
        <div className="bg-rose-200 flex-grow">
          confirmar
        </div>
      </div>
    </div>
  )
}