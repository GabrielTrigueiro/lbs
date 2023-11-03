import { IDataProduct } from '../../../models/product';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import modal from 'styles/Client/ClientSubMenu.module.scss';
import { ProductService } from '../../../services/api/product';
import ProductEditModal from 'shared/components/modal/Product/Edit/ProductEditModal';
import useEditarProduto from 'shared/hooks/produtos/EditarProduto';

interface props {
  product: IDataProduct;
  update: () => void;
}

export const ProductSubMenu: React.FC<props> = ({ update, product }) => {
  const { onOpen } = useEditarProduto();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirm, setConfirm] = useState<true | false>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleConfirm() {
    setConfirm(!confirm);
    removerProduto(product);
  }

  function removerProduto(produto: IDataProduct) {
    if (produto.id) {
      ProductService.DeleteById(produto.id).then((result) => {
        update();
      });
    }
  }

  return (
    <>
      <Tooltip title="opções">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#f5f5f5',
            border: '1px solid #D9D9D9',
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              p: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onOpen}>Editar</MenuItem>
        <MenuItem onClick={() => setConfirm(!confirm)}>Apagar</MenuItem>
      </Menu>

      <Dialog open={confirm}>
        <DialogTitle className={modal.confirmTitle}>
          Remover Produto?
        </DialogTitle>
        <DialogActions>
          <Button className={modal.button} onClick={() => setConfirm(!confirm)}>
            Não
          </Button>
          <Button className={modal.button} onClick={() => handleConfirm()}>
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      <ProductEditModal produto={product} atualizarPagina={update} />
    </>
  );
};
