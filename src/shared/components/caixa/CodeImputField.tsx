import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm, SubmitHandler } from "react-hook-form";
import { IItem, IItemLista } from "../../../pages/caixa";
import { useCallback, useEffect, useState } from "react";
import { IDataProduct } from "../../models/product";
import { ProductService } from "../../services/api/product";
import CloseIcon from '@mui/icons-material/Close';

interface ICodeInput {
  quantidade: number;
  code: string;
}

interface ICodeIputProps {
  add: (item: IItemLista) => void
}

const CodeImputField: React.FC<ICodeIputProps> = ({ add }) => {

  const { register, handleSubmit, resetField, setValue, watch } = useForm<ICodeInput>({
    defaultValues: {
      code: "",
      quantidade: 0
    }
  });

  const qtd = watch('quantidade', 0);
  const inpt = watch('code');
  const [searchList, setSearchList] = useState<IDataProduct[]>([]);
  const [tempProduct, setTempProduct] = useState<IDataProduct>();

  const onSubmit: SubmitHandler<ICodeInput> = (data) => {
    if (tempProduct) {
      let estruturando: IItemLista = {
        produto: tempProduct,
        precoTotal: (data.quantidade * tempProduct.salerPrice),
        quantidade: data.quantidade
      }
      add(estruturando);
    }
    setTempProduct(undefined)
    resetField("code");
    resetField("quantidade");
  };

  const handleTemp = useCallback((item: IDataProduct) => {
    setTempProduct(item)
    setValue("code", item.codeBarras)
    setValue("quantidade", 1)
  }, [setValue])

  const addOne = useCallback(() => {
    setValue("quantidade", (qtd + 1));
  }, [setValue, qtd])

  const rmvOne = useCallback(() => {
    if (qtd > 0) {
      setValue("quantidade", (qtd - 1));
    }
  }, [setValue, qtd])

  const clear = useCallback(() => {
    setValue("code", "")
  }, [setValue])

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
          grid-cols-6
          rounded-t-xl
          relative
          h-14
        "
    >
      {/* quantidade */}
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
        <RemoveIcon onClick={rmvOne} sx={{ cursor: "pointer" }} />
      </div>
      {/* input */}
      <div
        className="
          col-span-4
          flex
          relative
        "
      >
        <div
          className="
            bg-neutral-200
            flex
            p-2
            grow
            align-center
          "
        >
          <input
            placeholder="Digite um código ou uma palavra chave"
            onKeyUp={getList}
            autoComplete="off"
            {...register("code")}
            className="
              bg-transparent
              grow
              outline-none
              h-9
            "
          />
          <div
            onClick={clear}
            className="
              flex 
              items-center
              justify-center
              cursor-pointer
              hover:opacity-60
              transition
            "
          >
            <CloseIcon />
          </div>
        </div>
        {/* search */}
        {inpt && (
          <div
            className="
              bg-white
              absolute
              w-full
              bottom-[-8em]
              left-0
              h-32
              rounded-b-md
              overflow-auto
              border-2
              transition
              z-50
            "
          >
            {searchList.map((item) => (
              <div key={item.id}>
                <div
                  onClick={() => handleTemp(item)}
                  className="
                  p-2
                  cursor-pointer
                  hover:bg-neutral-100
                  border-b-2
                "
                >
                  {item.codeBarras} - {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* botão add */}
      <div className="col-span-1 rounded-tr-xl flex">
        <button
          disabled={inpt === ""}
          className={`
            grow
            rounded-tr-xl
            ${inpt === "" || qtd === 0 ? "bg-neutral-300" : "bg-yellow-300"}
            ${inpt === "" || qtd === 0 ? "hover:bg-neutral-300" : "hover:bg-yellow-200"}
          `}
          onClick={handleSubmit(onSubmit)}
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default CodeImputField;