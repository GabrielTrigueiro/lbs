import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ProductCabecalho from 'shared/components/product/Cabecalho/ProductCabecalho';
import { TableProductBox } from 'shared/components/product/ProductTables/TableProductBox';
import { TableProductList } from 'shared/components/product/ProductTables/TableProductList';
import { ISendPagination } from 'shared/models/client';
import { IDataProduct } from 'shared/models/product';
import { ProductService } from 'shared/services/api/product';
import { Cabecalho, Container, Footer, Tabela } from './ProductPageStyles';

export const ProductPage = () => {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState<IDataProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [estadoSwitch, setEstadoSwitch] = useState(false);

  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [actualpage, setActualPage] = useState(0);
  const [selectContent, setSelectContent] = useState('5');

  const capturarInput = (
    evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(evento.target.value);
  };

  function mudarSwitch() {
    setEstadoSwitch(!estadoSwitch);
  }

  let ProductPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    sortField: 'name',
    sortDirection: 'DESC',
    param: 'name',
    value: search,
  };

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setActualPage(value - 1);
  }

  function selectChange(event: SelectChangeEvent) {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string);
    setActualPage(0);
    setPageSize(translate);
  }

  function update() {
    ProductService.getAll(ProductPaginationConf).then((result) => {
      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setIsLoading(false);
        setPages(result.numberOfPages);
        setProductList(result.data);
        console.log(result.data);
      }
    });
  }

  useEffect(() => {
    update();
  }, [search, actualpage, pageSize]);

  return (
    <Container>
      <Cabecalho>
        <ProductCabecalho
          atualizarPagina={update}
          changeSearch={capturarInput}
          mudarSwicth={mudarSwitch}
          estadoSwitch={estadoSwitch}
        />
      </Cabecalho>
      <Tabela>
        {estadoSwitch ? (
          <TableProductBox lista={productList} update={update} />
        ) : (
          <TableProductList lista={productList} update={update} />
        )}
      </Tabela>
      <Footer>
        <FormControl sx={{ width: '100px', ml: 1, mb: 0.5 }} size="small">
          <InputLabel id="demo-simple-select-label">nº itens</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectContent}
            label="nº itens"
            onChange={selectChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={pages}
          shape="rounded"
          page={actualpage + 1}
          onChange={handleChange}
        />
      </Footer>
    </Container>
  );
};
