import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {IProviderCadastroInfo} from "../../models/provider";
import {ProviderService} from "../../services/api/providers/ProviderService";
import {ICategory} from "../../models/categories";
import {CategoryService} from "../../services/api/categories/Categories_Service";
import { ISendPagination } from "../../models/client";

interface IProps{
  categoria: ICategory;
  onSubmit: (objeto: ICategory) => void;
}
export default function AutoCompleteCategory({categoria, onSubmit}: IProps){

  const [listaObjeto, setListaObjeto] = useState<ICategory[]>([]);
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
    CategoryService.getAllCategories(value).then((response) => {
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
        value={categoria}
        onChange={(event: any, newValue) => onSubmit(newValue)}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => <TextField sx={{marginTop:"1em"}} variant={"standard"} value={searchValue} onChange={handleInputChange} {...params} label="Fornecedor" />}
      />
    </div>
  )
}