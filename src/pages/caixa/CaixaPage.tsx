import {
  CaixaContainer,
  InfosContainer,
  ListaContainer,
} from './CaixaPageStyles';
import CaixaList from 'shared/components/caixa/CaixaList/CaixaList';
import CodeInputField from 'shared/components/caixa/CaixaInput/CodeInputField';
import CaixaInfos from 'shared/components/caixa/CaixaInfos/CaixaInfos';
import { CaixaContextProvider } from 'shared/contexts/CaixaContext';

export const CaixaPage = () => {
  return (
    <CaixaContextProvider>
      <CaixaContainer>
        <ListaContainer>
          <CodeInputField />
          <CaixaList />
        </ListaContainer>
        <InfosContainer>
          <CaixaInfos />
        </InfosContainer>
      </CaixaContainer>
    </CaixaContextProvider>
  );
};
