import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {IProviderCadastroInfo} from "../../models/provider";
import {ProviderService} from "../../services/api/providers/ProviderService";

interface IProps{
  fornecedor: IProviderCadastroInfo | null;
}

export default function AutoCompleteProvider(props: IProps){

  const [objeto, setObjeto] = useState<IProviderCadastroInfo | null>(props.fornecedor);
  const [listaObjeto, setListaObjeto] = useState<IProviderCadastroInfo[]>([]);
  const [search, setSearch] = useState<string>("");
  //search
  let Search = {
    page: 0,
    pageSize: 10,
    sortField: "",
    sortDirection: "",
    param: "",
    value: search
  }
  const useSearch =() =>{
    ProviderService.getAll(Search).then((response) => {
      setListaObjeto(response.data);
      console.log(listaObjeto);
    });
  }

  useEffect(() => {
    useSearch();
  },[search])

  return (
    <div>
      <Autocomplete
        freeSolo
        id="AutoComplete"
        options={listaObjeto}
        renderInput={(params) => <TextField {...params} label="Fornecedor" />}
      />
    </div>
  )
}