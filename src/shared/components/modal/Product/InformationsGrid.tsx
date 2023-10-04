import {
  IListaInformacoesProduto,
  IProductInformation,
} from 'shared/models/product';
import { Button } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
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
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface EditToolbarProps {
  changeInformacoes: (
    newRows: (oldRows: IListaInformacoesProduto) => IListaInformacoesProduto
  ) => void;
  setRowModesModel: (
    newModel: (oldModel: IListaInformacoesProduto) => IListaInformacoesProduto
  ) => void;
}

interface IDataToGrid {
  quantidade: number;
  informacoes: IProductInformation[];
  changeInformacoes: React.Dispatch<
    React.SetStateAction<IProductInformation[]>
  >;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRowModesModel, changeInformacoes } = props;

  const handleClick = () => {
    const id = uuid();
    changeInformacoes((oldRows) => [
      ...oldRows,
      { id, color: '', quantity: 0, size: 0, isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'color' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Adicionar Informação
      </Button>
    </GridToolbarContainer>
  );
}

const InformationDataGrid = ({
  changeInformacoes,
  informacoes,
}: IDataToGrid) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    changeInformacoes(informacoes.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = informacoes.find((row) => row.id === id);
    if (editedRow!.isNew) {
      changeInformacoes(informacoes.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    changeInformacoes(
      informacoes.map((row) =>
        row.id === newRow.id
          ? {
              ...row,
              color: newRow.color,
              quantity: newRow.quantity,
              size: newRow.size,
            }
          : row
      )
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'color',
      headerName: 'Cor',
      type: 'string',
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      type: 'number',
      editable: true,
    },
    {
      field: 'size',
      headerName: 'Tamanho',
      editable: true,
      type: 'number',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opções',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Salvar"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Deletar"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      hideFooter={true}
      editMode="row"
      rows={informacoes}
      columns={columns}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { changeInformacoes, setRowModesModel },
      }}
    />
  );
};

export default InformationDataGrid;
