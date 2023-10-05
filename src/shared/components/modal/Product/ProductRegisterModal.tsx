import React, { useCallback, useState } from 'react';
import { Container } from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import { ProductAbout } from './ProductAbout';
import ModalHeader from './ModalHeader';
import { IListaInformacoesProduto } from '../../../models/product';
import { CardForm } from './ModalStyles';

interface props {
  atualizarPagina: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({ atualizarPagina }) => {
  const { isOpen, onClose } = useRegistrarProduto();

  return (
    <>
      <Container sx={{ outline: 'none' }} open={isOpen}>
        <CardForm>
          <ModalHeader
            tittle={'Cadastrar Produto'}
            closeButtonFunction={onClose}
          />
          <ProductAbout />
        </CardForm>
      </Container>
    </>
  );
};
