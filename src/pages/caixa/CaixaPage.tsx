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
        <div
          className="
            bg-white
          "
        >
          imagem e informações
        </div>
      </div>
    </div>
  )
}