import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {IProviderCadastroInfo} from "../../models/provider";
import {ProviderService} from "../../services/api/providers/ProviderService";
import { ISendPagination } from "../../models/client";

interface IProps{
  fornecedor: IProviderCadastroInfo;
  onSubmit: (objeto: IProviderCadastroInfo) => void;
}
export default function AutoCompleteProvider({fornecedor, onSubmit}: IProps){

  const [listaObjeto, setListaObjeto] = useState<IProviderCadastroInfo[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  let Search = {
    page: 0,
    pageSize: 10,
    sortField: "",
    sortDirection: "",
    param: "",
    value: searchValue
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }
  const getSearch =(value: ISendPagination) =>{
    ProviderService.getAll(Search).then((response) => {
      setListaObjeto(response.data);
    });
  }

  useEffect(() => {
    getSearch(Search)
  },[searchValue])

  return (
    <div>
      <Autocomplete
        disableClearable={true}
        id="AutoComplete"
        options={listaObjeto}
        value={fornecedor}
        onChange={(event: any, newValue) => onSubmit(newValue)}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => <TextField sx={{marginTop:"1em"}} variant={"standard"} value={searchValue} onChange={handleInputChange} {...params} label="Fornecedor" />}
      />
    </div>
  )
}