import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./styles.css";
import { Avatar, Box } from "@mui/material";
import {TableSubMenu} from "./TableSubMenu";
import { useEffect, useState } from "react";
import {
  ClienteService,
  IInfoClient,
} from "../../services/api/client/ClientService";
import { CadastroClienteForm } from "../../forms/formularios-cliente/CadastroClienteForm";
import { EditarCadastroCliente } from "../../forms/formularios-cliente/EditarCadastroCliente";

const TableStyled = styled(Table)({
  fontWeight: "bold",
  borderSpacing: "0px 8px",
  borderCollapse: "separate",
  thead: {
    borderSpacing: 0,
  },
});
const TableBodyStyled = styled(TableBody)({
  fontWeight: "bold",
});
const TableHeaderStyled = styled(TableHead)({
  fontWeight: "bold",
});
const TableRowStyled = styled(TableRow)({
  fontWeight: "bold",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  borderEndEndRadius: "10px",
});
const TableCellStyled = styled(TableCell)({
  fontWeight: "bold",
  borderColor: "transparent",
  padding: "10px 16px",
});


export const TableClients: React.FC<{
  lista: IInfoClient[],
  update: ()=>void,
}> = ({lista, update}) => {

  const [editModal, setEditModal] = useState<true | false>(false);
  const handleEditModal = () => { editModal ? setEditModal(false) : setEditModal(true) }
  
  const [confirm, setConfirm] = useState<true | false>(false);
  const handleEditConfirm = () => { confirm ? setConfirm(false) : setConfirm(true) }

  return (
    <TableContainer>
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHeaderStyled>
          <TableRow>
            <TableCellStyled></TableCellStyled>
            <TableCellStyled>Informações Básicas</TableCellStyled>
            <TableCellStyled>Número de Celular</TableCellStyled>
            <TableCellStyled>CPF</TableCellStyled>
          </TableRow>
        </TableHeaderStyled>
        <TableBodyStyled>
          {lista.map((row) => (
            <TableRowStyled
              key={row.id}
              sx={{ boxShadow: "inherit" }}
              className="MuiTableRow-root"
            >
              <TableCellStyled
                // style={{ borderLeftColor: row.status? "#42FF00" : "#FF5555" }}
                sx={{ width: 30, mr: "15px" }}
              >
                <Avatar />
              </TableCellStyled>
              <TableCellStyled>
                <Box display="flex">
                  <div>
                    {row.name}
                    <div>{row.email}</div>
                  </div>
                </Box>
              </TableCellStyled>
              <TableCellStyled>{row.cell}</TableCellStyled>
              <TableCellStyled>{row.cpf}</TableCellStyled>
              <TableCellStyled
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >

                <TableSubMenu
                update={()=>update()}
                client={row}

                dialog={handleEditConfirm}
                modal={handleEditModal}
                statusDialog={confirm}
                statusModal={editModal}
                >
                  <EditarCadastroCliente
                    modal={handleEditModal}
                    update={update}
                    client={row}
                  />
                </TableSubMenu>

              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBodyStyled>
      </TableStyled>
    </TableContainer>
  );
};
