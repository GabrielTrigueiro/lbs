import React, {useCallback, useState} from 'react';
import {Container} from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import {Card} from '@mui/material';
import {ProductAbout} from './ProductAbout';
import ModalHeader from './ModalHeader';
import {v4 as uuid} from "uuid";
import {IProductInformation} from "../../../models/product";

interface props {
  atualizarPagina: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({atualizarPagina}) => {

  const {isOpen, onClose} = useRegistrarProduto();
  const [informacoes, setInformacoes] = useState<IProductInformation[]>([]);

  const submitCadastroProduto = useCallback(() => {
    console.log(informacoes);
  },[])

  return (
    <>
      <Container sx={{outline: "none"}} open={isOpen}>
        <Card
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            position: 'relative',
            gap: 1,
          }}
        >
          <ModalHeader
            tittle={'Cadastrar Produto'}
            closeButtonFunction={onClose}
          />
          <ProductAbout
            submitProdutos={submitCadastroProduto}
            informacoes={informacoes}
            changeInformacoes={setInformacoes}
          />
        </Card>
      </Container>
    </>
  );
};
