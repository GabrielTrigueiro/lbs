import {
  DataGrid, GridColDef,
} from "@mui/x-data-grid";
import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import {IProductInformation} from "../../../models/product";

interface IDataForGrid {
  informacoes: IProductInformation[];
  changeInformacoes: React.Dispatch<React.SetStateAction<IProductInformation[]>>;
}

const InformationGrid = ({informacoes, changeInformacoes}:IDataForGrid) => {

  const columns: GridColDef[] = [
    {
      field: "color",
      headerName: "Cor",
      flex: 1,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantidade",
      flex: 1,
      type: 'number',
      editable: true,
    },
    {
      field: "size",
      headerName: "Tamanho",
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['PP', 'P', 'M', 'G', 'GG', "XG"],
    }
  ];
  return (
    <DataGrid
      sx={{overflow: "hidden", width: 400}}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      hideFooter={true}
      localeText={{noRowsLabel: "Nenhuma informação cadastrada"}}
      columns={columns}
      rows={informacoes.map((info, index) => ({...info, id: index + 1}))}

    />
  )
}

export default InformationGrid;