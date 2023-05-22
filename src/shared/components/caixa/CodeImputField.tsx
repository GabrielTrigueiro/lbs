import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ICodeInput {
  quantidade: number;
  code: string;
}

export const CodeImputField = () => {

  const { register, handleSubmit } = useForm<ICodeInput>();
  const hanfleConfirm: SubmitHandler<ICodeInput> = (data) => console.log(data);

  const [teste, setTeste] = useState(true);



  return (
    <div
      className="
        grow-0
      bg-white
        grid
        grid-cols-5
        rounded-t-xl
        relative
      "
    >
      <div
        className="
        bg-neutral-500
          text-white
          col-span-1
          flex
          items-center
          justify-center
          gap-2
          px-4
          rounded-tl-xl
        "
      >
        <AddIcon
          sx={{ cursor: "pointer" }}
        />

        <input
          autoComplete="off"
          id="quantidade"
          placeholder="Qtd"
          type="number"
          {...register("quantidade")}
          className="
            w-12
            rounded-md
            border-2
            peer
            text-center
            text-black
          "
        />

        <RemoveIcon
          sx={{ cursor: "pointer" }}
        />
      </div>
      <div
        className="
          col-span-4
          flex
          flex-col
          p-1
        "
      >
        <Typography align={"center"}>Informe uma descrição ou um código de barras</Typography>
        <input
          autoComplete="off"
          {...register("code")}
          placeholder="Código do produto"
          className="
            bg-neutral-200
            h-6
            flex
            outline-none
            rounded-md
            px-1
          "
        />
        
      </div>
    </div>
  )
}