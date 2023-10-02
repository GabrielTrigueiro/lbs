import React from 'react';
import { Container } from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import {ProductInfos} from './ProductAbout';
import ModalHeader from './ModalHeader';

interface props {
  atualizarPagina: () => void;
}

//   "categoryId": "string",
//   "codeBarras": "string",
//   "custePrice": 0,
//   "description": "string",
//   "informations": [
//     {
//       "color": "string",
//       "quantity": 0,
//       "size": "string"
//     }
//   ],
//   "name": "string",
//   "providerId": "string",
//   "quantity": 0,
//   "salerPrice": 0,
//   "tagPrice": 0

export const ProductRegisterModal: React.FC<props> = ({ atualizarPagina }) => {
  const { isOpen, onClose } = useRegistrarProduto();

  return (
    <>
      <Container sx={{outline: "none"}} open={isOpen}>
        <Card
          sx={{
            padding: 1,
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
          <ProductInfos
            informacoes={[{color: 'azul', quantity: 23, size: 'M'}, {color: 'preto', quantity: 10, size: 'M'}, {color: 'vermelho', quantity: 3, size: 'M'}]}
          />
        </Card>
      </Container>
    </>
  );
};
