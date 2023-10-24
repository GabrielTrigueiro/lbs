import { Add } from '@mui/icons-material';
import { Box, Typography, Button, Grid, Icon } from '@mui/material';
import { ProductRegisterModal } from 'shared/components/modal/Product/ProductRegisterModal';
import { SearchInput } from 'shared/components/search';
import { SwitchProductList } from '../switchProductList/SwitchProductList';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';
import {
  Container,
  CorpoCabecalho,
  Info,
  ItemCabecalho,
  Titulo,
} from './ProductCabecalhoStyles';
import TitlePageContainer from 'shared/components/pages-components/TitlePageContainer';

interface CabecalhoProps {
  mudarSwicth: () => void;
  atualizarPagina: () => void;
  changeSearch: (
    evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  estadoSwitch: boolean;
}

export default function ProductCabecalho({
  mudarSwicth,
  estadoSwitch,
  changeSearch,
  atualizarPagina,
}: CabecalhoProps) {
  const { onOpen } = useRegistrarProduto();

  return (
    <Container>
      <TitlePageContainer
        handleMainButton={onOpen}
        mainButtonLabel="Cadastrar produtos"
        pageTitle="Produtos"
      />

      <CorpoCabecalho>
        <ItemCabecalho>
          <h1>Lista de Produtos</h1>
          <SearchInput change={changeSearch} />
          <SwitchProductList change={mudarSwicth} state={estadoSwitch} />
        </ItemCabecalho>
        <ItemCabecalho>
          <Info>
            <Icon sx={{ color: '#42FF00' }}>circle</Icon>
            <h1>Em estoque</h1>
          </Info>
          <Info>
            <Icon sx={{ color: '#E4DB00' }}>circle</Icon>
            <h1>Ultimas und.</h1>
          </Info>
          <Info>
            <Icon sx={{ color: '#FF5555' }}>circle</Icon>
            <h1>Faltando</h1>
          </Info>
        </ItemCabecalho>
      </CorpoCabecalho>

      <ProductRegisterModal atualizarPagina={atualizarPagina} />
    </Container>
  );
}
