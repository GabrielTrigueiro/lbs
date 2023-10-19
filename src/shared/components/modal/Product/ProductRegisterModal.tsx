import React, { useCallback, useState } from 'react';
import { Container } from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import { ProductAbout } from './ProductAbout';
import ModalHeader from './ModalHeader';
import { IListaInformacoesProduto } from '../../../models/product';
import { CardForm } from './ModalStyles';
import GenericDialog from '../Dialog/Dialog';
import useDialogProduct from 'shared/hooks/dialogs/DialogProduct';

interface props {
  atualizarPagina: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({ atualizarPagina }) => {
  const { isOpen, onClose } = useRegistrarProduto();
  const { onOpenDialog, onCloseDialog, isOpenDialog } = useDialogProduct();

  function cancelRegister() {
    onCloseDialog();
    onClose();
  }

  return (
    <>
      <Container sx={{ outline: 'none' }} open={isOpen} onClose={onOpenDialog}>
        <CardForm>
          <ModalHeader
            tittle={'Cadastrar Produto'}
            closeButtonFunction={onOpenDialog}
          />
          <ProductAbout close={onClose} atualizar={atualizarPagina} />
        </CardForm>
      </Container>
      <GenericDialog
        isOpenDialog={isOpenDialog}
        onCloseDialog={onCloseDialog}
        title="Cancelar cadastro?"
        confirmAction={cancelRegister}
      />
    </>
  );
};
