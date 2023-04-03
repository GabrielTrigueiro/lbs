import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useState } from "react";
import { Notification } from "../notification";
import modal from "../../../styles/Client/ClientSubMenu.module.scss";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { IndicationService } from "../../services/api/indication/IndicationService";
import { ICategoryRegister } from "../../models/categories";
import { CategoryEditModal } from "../modal/Category/CategoryEditModal";
import { CategoryService } from "../../services/api/categories/Categories_Service";

export const CategoryTableSubMenu: React.FC<{
    update: () => void;
    categoria: ICategoryRegister;
}> = ({ update, categoria }) => {

    //modal de edição
    const [editModal, setEditModal] = useState<true | false>(false);
    function handleModal() {
        setEditModal(!editModal);
    }
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    //modal de remoção
    const [confirm, setConfirm] = useState<true | false>(false);
    const [delet, setDelet] = useState<true | false>(false);

    const [dialogState, setDialogState] = useState<boolean>(false);
    const [detailState, setDetailState] = useState<boolean>(false);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function deletarCategoria(e: ICategoryRegister) {
        if (e.id) {
            CategoryService.deletCategory(e.id)
                .then((result) => {
                    Notification("Categoria removida com sucesso.", "success");
                    update();
                })
        }
    }

    function handleConfirm() {
        setConfirm(!confirm)
        deletarCategoria(categoria)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: "4px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="opções">
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
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #D9D9D9",
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
                <MenuItem onClick={handleModal}>
                    Editar
                </MenuItem>
                <MenuItem onClick={() => setConfirm(!confirm)}>
                    Apagar
                </MenuItem>
            </Menu>

            <Dialog open={confirm}>
                <DialogTitle className={modal.confirmTitle}>Remover Categoria?</DialogTitle>
                <DialogActions>
                    <Button className={modal.button} onClick={() => setConfirm(!confirm)}>Não</Button>
                    <Button className={modal.button} onClick={() => handleConfirm()}>Sim</Button>
                </DialogActions>
            </Dialog>

            <CategoryEditModal categoria={categoria} handleModal={handleModal} modalState={editModal} update={update}/>
        </>
    );
};
