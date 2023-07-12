import { useCallback, useState } from 'react';
import CodeImputField from 'shared/components/caixa/CodeImputField';
import CaixaList from 'shared/components/caixa/CaixaList';
import CaixaInfos from 'shared/components/caixa/CaixaInfos';
import {
  CaixaContainer,
  InfosContainer,
  ListaContainer,
} from './CaixaPageStyles';
import { IItemLista } from 'shared/models/caixa';

export const CaixaPage = () => {
  const [lista, setLista] = useState<IItemLista[]>([]);

  const addToList = useCallback(
    (produto: IItemLista) => {
      setLista([...lista, produto]);
    },
    [lista]
  );

  const removeItem = useCallback(
    (index: number) => {
      const updatedItems = [...lista];
      updatedItems.splice(index, 1);
      setLista(updatedItems);
    },
    [lista]
  );

  const editQtd = useCallback(
    (index: number, valor: number) => {
      const updatedObjects = lista.map((obj, itemAt) => {
        if (itemAt === index) {
          return {
            ...obj,
            quantidade: valor,
          };
        }
        return obj;
      });
      setLista(updatedObjects);
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
        <CodeImputField add={addToList} />
        <CaixaList rmvItem={removeItem} clear={clearList} lista={lista} />
      </ListaContainer>

      {/* infos */}
      <InfosContainer>
        <CaixaInfos />
      </InfosContainer>
    </CaixaContainer>
  );
};
