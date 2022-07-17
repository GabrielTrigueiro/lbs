import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { ClienteService, IInfoClient } from "../../../services";
import { Modal } from "@mui/material";
import { EditarCadastroCliente } from "../../../forms";
import { useState } from "react";
import { ConfirmationButton } from "../confirmation-button/ConfirmationButton";

export const TableSubMenu: React.FC<{
  client: IInfoClient;
  update: () => void
}> = ({ client, update }) => {

  const [editModal, setEditModal] = useState<true | false>(false);

  const handleEditModal = () => {
    editModal ? setEditModal(false) : setEditModal(true);
  };

  const [confirm, setConfirm] = useState<true | false>(false);

  const handleEditConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = () => {
    if (client.id)
      ClienteService.DeleteById(client.id).then((result) => {
        update();
      });
  };

  return (
    <Box>
      <Box
        sx={{
          marginTop:'4px',
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              p: 1
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEditModal}> Editar </MenuItem>
        <MenuItem> Detalhes </MenuItem>
        <MenuItem onClick={handleDeleteUser}> Apagar </MenuItem>
      </Menu>

      <Modal sx={{ minWidth: 1020 }} onClose={handleEditConfirm} open={editModal}>
        <Box
          sx={{
            //posição do modal
            position: "absolute" as "absolute",
            top: "40%",
            left: "50%",
            height: 600,
            width: 1000,
            transform: "translate(-50%, -40%)",

            //CSS estilo
            borderRadius: 1,
            borderColor: "transparent",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: 1,

            alignItems: "center",
            justifyContent: "center",
        }}>
          <EditarCadastroCliente  client={client} update={update}/>
        </Box>
      </Modal>

      <ConfirmationButton 
        confirmMessage="Deseja salvar as alterações?"
        confirmStatus={confirm}
        handleDialog={handleEditConfirm}
        handleModal={handleEditModal}
      />
    </Box>
  );
};
