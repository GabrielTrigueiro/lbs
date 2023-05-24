import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm, SubmitHandler } from "react-hook-form";
import { IItem } from "../../../pages/caixa";
import { useCallback, useEffect, useState } from "react";
import { IDataProduct } from "../../models/product";
import { ProductService } from "../../services/api/product";

interface ICodeInput {
  quantidade: number;
  code: string;
}

interface ICodeIputProps {
  add: (item: IItem) => void
}

const CodeImputField: React.FC<ICodeIputProps> = ({ add }) => {

  const { register, handleSubmit, resetField, setValue, watch } = useForm<ICodeInput>();
  const qtd = watch('quantidade', 0);
  const inpt = watch('code');
  const [searchList, setSearchList] = useState<IDataProduct[]>([])

  const onSubmit: SubmitHandler<ICodeInput> = (data) => {
    add(data);
    resetField("code");
    resetField("quantidade");
  };

  const addOne = useCallback(() => {
    setValue("quantidade", qtd + 1);
  }, [setValue, qtd])

  const getList = useCallback(async () => {
    let search = {
      page: 0,
      pageSize: 5,
      param: "name",
      sortDirection: "DESC",
      sortField: "name",
      value: inpt
    }
    await ProductService.getAll(search)
      .then((resp) => setSearchList(resp.data))
  }, [inpt])

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
        <AddIcon onClick={addOne} sx={{ cursor: "pointer" }} />
        <input
          autoComplete="off"
          placeholder="Qtd"
          type="number"
          {...register("quantidade")}
          className="
              w-12
              rounded-md
              peer
              text-center
              text-black
              outline-none
              p-1
            "
        />
        <RemoveIcon sx={{ cursor: "pointer" }} />
      </div>
      <div
        className="
            col-span-3
            flex
            flex-col
            relative
          "
      >
        <Typography align={"center"}>Informe uma descrição ou um código de barras</Typography>
        <input
          onKeyUp={getList}
          autoComplete="off"
          {...register("code")}
          className="
              bg-neutral-200
              outline-none
              h-9
            "
        />
        {inpt && (
          <div
            className="
            bg-rose-400
              absolute
              w-full
              bottom-[-8em]
              h-32
              rounded-b-md
          "
          >
            {searchList.map((item) => (
              <div key={item.id}>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 rounded-tr-xl flex">
        <button
          className="
              grow
              bg-yellow-300
              rounded-tr-xl
              hover:bg-yellow-200
            "
          onClick={handleSubmit(onSubmit)}
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default CodeImputField;