import { useCallback, useState } from 'react';
import CaixaList from 'shared/components/caixa/CaixaList/CaixaList';
import CaixaInfos from 'shared/components/caixa/CaixaInfos';
import {
  CaixaContainer,
  InfosContainer,
  ListaContainer,
} from './CaixaPageStyles';
import { IItemLista } from 'shared/models/caixa';
import CodeInputField from 'shared/components/caixa/CaixaInput/CodeInputField';

export const CaixaPage = () => {
  const [lista, setLista] = useState<IItemLista[]>([]);

  const addToList = useCallback(
    (produto: IItemLista) => {
      setLista([...lista, produto]);
    },
    [lista]
  );

  const removeItem = useCallback(
    (index: string) => {
      const updatedItems = [...lista];
      updatedItems.splice(Number(index), 1);
      setLista(updatedItems);
    },
    [lista]
  );

  const clearList = useCallback(() => {
    setLista([]);
  }, []);

  return (
    <CaixaContainer>
      {/* lista */}
      <ListaContainer>
        <CodeInputField add={addToList} />
        <CaixaList rmvItem={removeItem} clear={clearList} lista={lista} />
      </ListaContainer>

      {/* infos */}
      <InfosContainer>
        <CaixaInfos />
      </InfosContainer>
    </CaixaContainer>
  );
};
