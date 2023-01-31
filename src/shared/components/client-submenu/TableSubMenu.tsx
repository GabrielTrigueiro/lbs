import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { ClienteService } from "../../services";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ConfirmationButton } from "../confirmation-button/ConfirmationButton";
import { DialogConfirm } from "../confirmation-button/DialogConfirm";
import { ClientDetail } from "../modal/ClientDetailModal";
import { IInfoClient } from "../../models/client";

export const TableSubMenu: React.FC<{
  update: () => void;
}> = ({ update }) => {

  const [editModal, setEditModal] = useState<true | false>(false);
  const [confirm, setConfirm] = useState<true | false>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [delet, setDelet] = useState<true | false>(false);
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [detailState, setDetailState] = useState<boolean>(false)

  const open = Boolean(anchorEl);

  const handleEditModal = () => {
    editModal ? setEditModal(false) : setEditModal(true);
  };

  const handleEditConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleDeleteUser = () => {
  //   if (client.id)
  //     ClienteService.DeleteById(client.id)
  //     .then((result) => {
  //       update();
  //     });
  // };

  // const functionTeste = (e:IInfoClient) => {
  //   if(e.id){
  //     e.isActive = !e.isActive
  //     ClienteService.UpdateById(e.id, e)
  //     .then((result) => {
  //       update();
  //     });
  //   }
  // }

  return (
    <Box>
      <Box
        sx={{
          marginTop: "4px",
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
              p: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleEditModal}>
          Editar
        </MenuItem>
        <MenuItem onClick={()=>setDialogState(true)}>
          Alterar Status
        </MenuItem>
        <MenuItem onClick={()=> setDetailState(true)}>
          Detalhes
        </MenuItem>
        <MenuItem onClick={()=>setDelet(true)}>
          Apagar
        </MenuItem> */}
      </Menu>

      <Modal
        sx={{ minWidth: 1020 }}
        onClose={handleEditConfirm}
        open={editModal}
      >
        <Box
          sx={{
            overflow: "auto",
            //posição do modal
            position: "absolute" as "absolute",
            top: "40%",
            left: "50%",
            height: "600px",
            width: "1000px",
            transform: "translate(-50%, -40%)",

            //CSS estilo
            borderRadius: 0,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: 0,

            alignItems: "center",
            justifyContent: "center",
          }}
        >

        </Box>
      </Modal>
{/* 
      <ConfirmationButton
        confirmMessage="Deseja salvar as alterações?"
        confirmStatus={confirm}
        handleDialog={handleEditConfirm}
        handleModal={handleEditModal}
      /> */}
{/* 
      <Dialog
        open={delet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Excluir permanentemente?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "#E4DB00", color: "#000" }}
            onClick={() => {
              {setDelet(false);}
            }}
          >
            Fechar
          </Button>
          <Button
            sx={{ backgroundColor: "#E4DB00", color: "#000" }}
            onClick={() => {
              setDelet(false);
              handleDeleteUser();
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog> */}
      
      {/* <DialogConfirm
        dialogState={dialogState}
        setDialogState={()=>setDialogState(false)}
        dialogMessage={'Confirmar alteração?'}
        handleSomething={()=>functionTeste(client)}
      /> */}

      {/* <ClientDetail
        close={()=>setDetailState(false)}
        state={detailState}
        thisClient={client}
        tittle={'Dados do Cliente'}
      /> */}
    </Box>
  );
};
