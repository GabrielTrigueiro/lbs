import {
  IListaInformacoesProduto,
  IProductInformation,
} from 'shared/models/product';
import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridColDef,
  GridRowsProp,
  DataGrid,
  GridPreProcessEditCellProps,
  GridEditInputCell,
  GridRenderEditCellParams,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

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

function EditToolbar(props: EditToolbarProps, quantidade: number) {
  const { setRowModesModel, changeInformacoes } = props;
  const desabilitado = quantidade < 1 ? false : true;
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
        disabled={!desabilitado}
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

function QuantityEditInputCell(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function renderEditQuantity(params: GridRenderEditCellParams) {
  return <QuantityEditInputCell {...params} />;
}

const InformationDataGrid = ({
  quantidade,
  changeInformacoes,
  informacoes,
}: IDataToGrid) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  let promiseTimeout: any;

  function validateQuantidade(qtd: number): Promise<boolean> {
    const quantidadeAtual = informacoes.reduce(
      (total, row) => total + row.quantity,
      0
    );
    const quantidadeSomada = quantidadeAtual + qtd;
    const ultrapassou = quantidadeSomada > quantidade || qtd < 0;
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        resolve(ultrapassou ? `Invalido` : null);
      }, Math.random() * 500 + 100);
    });
  }

  const preProcessEditCellProps = async (
    params: GridPreProcessEditCellProps
  ) => {
    const errorMessage = await validateQuantidade(
      params.props.value!.toString()
    );
    return { ...params.props, error: errorMessage };
  };

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
      preProcessEditCellProps,
      renderEditCell: renderEditQuantity,
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
      localeText={{ noRowsLabel: 'Nenhuma iformação cadastrada' }}
      slots={{
        toolbar: (event) => EditToolbar(event, quantidade),
      }}
      slotProps={{
        toolbar: { changeInformacoes, setRowModesModel },
      }}
    />
  );
};

export default InformationDataGrid;
