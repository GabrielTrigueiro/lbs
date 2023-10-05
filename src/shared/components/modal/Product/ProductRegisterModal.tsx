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
  const [informacoes, setInformacoes] = useState<IListaInformacoesProduto>([]);
  const [quantidade, setQuantidade] = useState<number>(12);

  const submitCadastroProduto = useCallback(() => {
    console.log(informacoes);
  }, [informacoes]);

  return (
    <>
      <Container sx={{ outline: 'none' }} open={isOpen}>
        <CardForm>
          <ModalHeader
            tittle={'Cadastrar Produto'}
            closeButtonFunction={onClose}
          />
          <ProductAbout
            quantidade={quantidade}
            submitProdutos={submitCadastroProduto}
            informacoes={informacoes}
            changeInformacoes={setInformacoes}
          />
        </CardForm>
      </Container>
    </>
  );
};
