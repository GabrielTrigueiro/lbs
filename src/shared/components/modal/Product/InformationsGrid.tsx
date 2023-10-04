import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {v4 as uuid} from "uuid";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons
} from "@mui/x-data-grid";
import {IProductInformation} from "../../../models/product";

interface EditToolbarProps {
  setListaInformacoes: (newRows: (oldRows: IProductInformation[]) => IProductInformation[]) => void;
  setRowModesModel: (
    newModel: (oldModel: IProductInformation[]) => IProductInformation[]
  ) => void;
}
interface IProductAbout {
  informacoes: IProductInformation[];
  setListaInformacoes: React.Dispatch<React.SetStateAction<IProductInformation[]>>;
}
function EditToolbar(props: EditToolbarProps) {
  const {setListaInformacoes, setRowModesModel} = props;
  const handleClick = () => {
    const id = uuid();
    setListaInformacoes((oldRows) => [...oldRows, {id, color: "", quantity: 0, size: 0, isNew: true}]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: {mode: GridRowModes.Edit, fieldToFocus: "color"}
    } ));
  };
  return (
    <GridToolbarContainer>
      <Button fullWidth variant={"contained"} startIcon={<AddIcon/>} onClick={handleClick}>
        Adicionar informação
      </Button>
    </GridToolbarContainer>
  );
}
export default function InformationDaraGrid({informacoes, setListaInformacoes}:IProductAbout) {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params,event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    setListaInformacoes(informacoes.filter((row) => row.id !== id));
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true}
    });

    const editedRow = informacoes.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setListaInformacoes(informacoes.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {...newRow, isNew: false};
    function dsdsds(lista: IProductInformation[], novoItem: GridRowModel): IProductInformation[]{
      lista.map((produto) => (produto.id === novoItem.id ? {...produto, color: novoItem.color, quantity: novoItem.quantity, size: novoItem.size} : produto))
      return lista
    }
    setListaInformacoes(dsdsds(informacoes, newRow))
    console.log('dentro da tabela: ' + informacoes)
    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns: GridColDef[] = [
    {
      field: "color",
      headerName: "Cor",
      type: "string",
      editable: true
    },
    {
      field: "quantity",
      headerName: "Quantidade",
      type: "number",
      editable: true
    },
    {
      field: "size",
      headerName: "Tamanho",
      type: "number",
      editable: true
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon/>}
              label="Salvar"
              sx={{
                color: "primary.main"
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon/>}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon/>}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon/>}
            label="Deletar"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];
  return (
      <DataGrid
        rows={informacoes}
        columns={columns}
        editMode="row"
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooter={true}
        onStateChange={(state) => setListaInformacoes(state...........ç)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setListaInformacoes, setRowModesModel },
        }}
      />
  );
}