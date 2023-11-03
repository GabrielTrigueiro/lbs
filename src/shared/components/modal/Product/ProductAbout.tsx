import { Box, Button, Skeleton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import CurrencyTextField from 'shared/components/CurrencyTextField/CurrencyTextField';
import CustomAutocomplete from 'shared/components/caixa/CaixaInput/CustomAutocomplete';
import { Notification } from 'shared/components/notification';
import { ISendPagination } from 'shared/models/client';
import { CategoryService } from 'shared/services/api/categories/Categories_Service';
import { ProductService } from 'shared/services/api/product';
import { ProviderService } from 'shared/services/api/providers/ProviderService';
import * as Yup from 'yup';
import {
  IDataProduct,
  IDataProductRegister,
  IListaInformacoesProduto,
  ProductValidationSchema,
} from '../../../models/product';
import InformationDataGrid from './InformationsGrid';
import {
  AboutFields,
  AboutForm,
  FormularioRegistro,
  ValueFields,
  ValueForm,
} from './ModalStyles';
import { MoonLoader } from 'react-spinners';

interface IProductAbout {
  close: () => void;
  atualizar: () => void;
  produto?: IDataProduct;
}

export const ProductAbout = ({ close, atualizar, produto }: IProductAbout) => {
  const [informacoes, setInformacoes] = useState<IListaInformacoesProduto>([]);
  const [fornecedor, setFornecedor] = useState<string>();
  const [categoria, setCategoria] = useState<string>();
  const [custo, setCusto] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [sale, setSale] = useState<string>();
  const [loadingInfos, setLoadingInfos] = useState(true);

  const handleCategoria = useCallback(() => {
    return CategoryService.getCategories();
  }, []);

  const handleFornecedor = useCallback((conf: ISendPagination) => {
    return ProviderService.getAll(conf);
  }, []);

  function lucro(initialPrice: string, finalPrice: string): string {
    let inicio = parseFloat(initialPrice.replace(',', '.'));
    let final = parseFloat(finalPrice.replace(',', '.'));
    return (((final - inicio) / inicio) * 100).toFixed(2);
  }

  function getPercentage(campo: 'tag' | 'venda'): string {
    if (custo === undefined && tag === undefined && campo === 'tag') {
      return '0';
    }
    if (tag === undefined && custo === undefined && campo === 'venda') {
      return '0';
    }
    if (custo && sale && campo === 'venda') {
      return lucro(custo, sale);
    }
    if (sale && tag && campo === 'tag') {
      return lucro(sale, tag);
    } else {
      return '0';
    }
  }

  const initialValues: any = produto
    ? produto
    : {
        codeBarras: '',
        name: '',
        description: '',
        quantity: 0,
        informations: [],
        categoryId: '',
        providerId: '',
        custePrice: 0,
        salerPrice: 0,
        tagPrice: 0,
      };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (custo && tag && sale && fornecedor && categoria) {
          formik.values.custePrice = parseFloat(custo.replace(',', '.'));
          formik.values.tagPrice = parseFloat(tag.replace(',', '.'));
          formik.values.salerPrice = parseFloat(sale.replace(',', '.'));
          formik.values.categoryId = categoria;
          formik.values.providerId = fornecedor;
        }
        await ProductValidationSchema.validate(values, { abortEarly: false });
        ProductService.Create(values);
        formik.resetForm();
        close();
        atualizar();
      } catch (error) {
        //mostrando os erros no yup em notificações
        if (Yup.ValidationError.isError(error)) {
          error.inner.forEach((validationError) => {
            Notification(validationError.message, 'error');
          });
        } else {
          console.error(error);
        }
      }
      setSubmitting(false);
    },
  });

  return loadingInfos && produto ? (
    <Box
      sx={{
        height: '490px',
        width: '620px',
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <MoonLoader
        cssOverride={{ margin: 'auto' }}
        loading={loadingInfos}
        speedMultiplier={0.5}
      />
    </Box>
  ) : (
    <FormularioRegistro onSubmit={formik.handleSubmit}>
      <AboutForm sx={{ gap: 1 }}>
        <Skeleton
          variant="rectangular"
          sx={{
            minWidth: 230,
            minHeight: 230,
            borderRadius: 1,
          }}
        />
        <AboutFields sx={{ gap: 1 }}>
          <TextField
            name="codeBarras"
            label="Código de Barras"
            value={formik.values.codeBarras}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.codeBarras && Boolean(formik.errors.codeBarras)
            }
            // helperText={formik.touched.codeBarras && formik.errors.codeBarras}
            size="small"
            autoComplete="off"
          />
          <TextField
            name="name"
            label="Nome"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            // helperText={formik.touched.name && formik.errors.name}
            size="small"
            autoComplete="off"
          />
          <TextField
            name="description"
            label="Descrição"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            // helperText={formik.touched.description && formik.errors.description}
            fullWidth
            size="small"
            autoComplete="off"
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              sx={{ maxWidth: 110 }}
              inputMode="numeric"
              name="quantity"
              label="Quantidade"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              // helperText={formik.touched.quantity && formik.errors.quantity}
              size="small"
              autoComplete="off"
            />
            <CustomAutocomplete
              size="small"
              label="Fornecedor"
              placeholder="Procurar fornecedor"
              fetchOptions={handleFornecedor}
              onUpdateValue={(newValue: any) => {
                setFornecedor(newValue.id);
              }}
            />
          </Box>
          <CustomAutocomplete
            size="small"
            label="Categoria"
            placeholder="Procurar categoria"
            fetchOptions={handleCategoria}
            onUpdateValue={(newValue: any) => {
              setCategoria(newValue.id);
            }}
          />
        </AboutFields>
      </AboutForm>
      <Box sx={{ height: 250, display: 'flex', gap: 1 }}>
        <ValueForm>
          <ValueFields sx={{ gap: 1 }}>
            <CurrencyTextField
              size={'small'}
              label="Preço de custo"
              amount={custo}
              stateFunction={setCusto}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Lucro</Typography>
              <Typography>{getPercentage('venda')}%</Typography>
            </Box>
            <CurrencyTextField
              size={'small'}
              label="Preço de venda"
              amount={sale}
              stateFunction={setSale}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Lucro</Typography>
              <Typography>{getPercentage('tag')}%</Typography>
            </Box>
            <CurrencyTextField
              size={'small'}
              label="Preço de etiqueta"
              amount={tag}
              stateFunction={setTag}
            />
          </ValueFields>
          <Button type="submit" variant={'contained'}>
            Cadastrar
          </Button>
        </ValueForm>
        {/*TABELA*/}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <InformationDataGrid
            quantidade={Number(formik.values.quantity)}
            informacoes={informacoes}
            changeInformacoes={setInformacoes}
          />
        </Box>
      </Box>
    </FormularioRegistro>
  );
};
