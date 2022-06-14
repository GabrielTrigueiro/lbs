import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Theme} from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { TableContainer,Box } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const useStyles = makeStyles((theme: Theme) => ({
    root: {
      border: 'transparent',
      
      '& .paxton-table--row': {
        border: 'transparent',
        borderRadius: "20px",
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
      },
      // remove borders and separators
      '& .paxton-table--cell': {
        border: 'none',
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-columnsContainer': {
        border: 'none',
      },
      // This is to fix the rows being cut off due to adding padding
      '& .MuiDataGrid-viewport': {
        maxHeight: 'unset !important',
      },
      '& .MuiDataGrid-renderingZone': {
        maxHeight: '670px !important', // <= manually setting the max height, but this is not responsive
      },
    },
  }));

export default function TableClients2() {
    const classes = useStyles();
   
  return (
    
    <Box sx={{ height: '70vh' }}>
    {/* {loading && <LinearProgress />} */}
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      disableSelectionOnClick
      
      rowHeight={40}
      className={classes.root} // set class so that we can apply styling from makeStyles
      getRowClassName={() => 'paxton-table--row'} // set row styling
    />
  </Box>
  );
}