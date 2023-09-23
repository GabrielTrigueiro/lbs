import { ProductCard } from './ProductCard';
import styled from '@emotion/styled';
import { IDataProduct } from '../../../models/product';

const Lista = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Item = styled.article`
  height: 250px;
  max-width: 250px;
`;

interface props {
  lista: IDataProduct[];
  update: () => void;
}

export const TableProductBox: React.FC<props> = ({ update, lista }) => {
  return (
    <Lista>
      {lista.map((row, index) => (
        <Item key={index}>
          <ProductCard data={row} update={update} />
        </Item>
      ))}
    </Lista>
  );
};
