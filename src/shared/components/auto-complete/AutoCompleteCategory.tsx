import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {IProviderCadastroInfo} from "../../models/provider";
import {ProviderService} from "../../services/api/providers/ProviderService";

interface IProps{
  fornecedor: IProviderCadastroInfo;
  onSubmit: (objeto: IProviderCadastroInfo) => void;
}
export default function AutoCompleteProvider({fornecedor, onSubmit}: IProps){

  const [listaObjeto, setListaObjeto] = useState<IProviderCadastroInfo[]>([]);
  const [search, setSearch] = useState<string>("");
  let Search = {
    page: 0,
    pageSize: 10,
    sortField: "",
    sortDirection: "",
    param: "",
    value: search
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  const useSearch =() =>{
    ProviderService.getAll(Search).then((response) => {
      setListaObjeto(response.data);
    });
  }

  useEffect(() => {
    useSearch()
  },[search])

  return (
    <div>
      <Autocomplete
        disableClearable={true}
        id="AutoComplete"
        options={listaObjeto}
        value={fornecedor}
        onChange={(event: any, newValue) => onSubmit(newValue)}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => <TextField value={search} onChange={handleInputChange} {...params} label="Fornecedor" />}
      />
    </div>
  )
}