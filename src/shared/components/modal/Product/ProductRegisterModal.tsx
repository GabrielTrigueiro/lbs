import React, {useState} from 'react';
import {Container} from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import { Card } from '@mui/material';
import {ProductAbout} from './ProductAbout';
import ModalHeader from './ModalHeader';
import {v4 as uuid} from "uuid";
import {IProductInformation} from "../../../models/product";

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

export const ProductRegisterModal: React.FC<props> = ({atualizarPagina}) => {
  const {isOpen, onClose} = useRegistrarProduto();
  const [informacoes, setInformacoes] = useState<IProductInformation[]>([
    {id: uuid(), color: 'azul', quantity: 23, size: 'M'},
    {id: uuid(), color: 'preto', quantity: 10, size: 'M'},
    {id: uuid(), color: 'vermelho', quantity: 3, size: 'M'}
  ]);
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
          <ProductAbout
            informacoes={informacoes}
            changeInformacoes={setInformacoes}
          />
        </Card>
      </Container>
    </>
  );
};
