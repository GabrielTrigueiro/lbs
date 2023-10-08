import styled from '@emotion/styled';
import { Box, Skeleton, Typography } from '@mui/material';
import { getBorderColor } from 'shared/components/table/TableStyles';
import { fundoBranco } from 'styles/variables';
import { IDataProduct, statusProduto } from '../../../models/product';
import { ProductSubMenu } from '../productSubMenu/ProductSubMenu';
import { Imagem, Infos, Nome } from './ProductCardStyles';

interface props {
  data: IDataProduct;
  update: () => void;
}

const Card = styled.div<{ status: statusProduto }>`
  background-color: ${fundoBranco};
  height: 150;
  width: 100;
  border-radius: 1em;
  padding: 0.5em;
  border: 2px solid ${(props) => getBorderColor(props.status)};
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ProductCard: React.FC<props> = ({ data, update }) => {
  return (
    <Card status={data.status}>
      <Skeleton
        variant="rectangular"
        sx={{
          minWidth: 100,
          minHeight: 150,
          borderRadius: 1,
        }}
      />
      <Nome>
        <Typography className="name">{data.name}</Typography>
      </Nome>
      <Infos>
        <Box>
          <h1>Código: {data.codeBarras}</h1>
          <h1>Venda: R$ {data.salerPrice}</h1>
          <h1>Etiqueta: R$ {data.tagPrice}</h1>
          <h1>Quantidade: {data.quantity}</h1>
        </Box>
        <ProductSubMenu product={data} update={update} />
      </Infos>
    </Card>
  );
};
