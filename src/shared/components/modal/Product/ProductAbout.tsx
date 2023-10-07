import { Box, Button, Skeleton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  IDataProductRegiser,
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
import { CategoryService } from 'shared/services/api/categories/Categories_Service';
import { ProviderService } from 'shared/services/api/providers/ProviderService';
import CustomAutocomplete from 'shared/components/caixa/CaixaInput/CustomAutocomplete';
import { ISendPagination } from 'shared/models/client';
import { Notification } from 'shared/components/notification';
import CurrencyTextField from 'shared/components/CurrencyTextField/CurrencyTextField';
import { ProductService } from 'shared/services/api/product';

interface IProductAbout {
  close: () => void;
  atualizar: () => void;
}

export const ProductAbout = ({ close, atualizar }: IProductAbout) => {
  const [informacoes, setInformacoes] = useState<IListaInformacoesProduto>([]);
  const [custo, setCusto] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [sale, setSale] = useState<string>();

  function handleCategoria() {
    return CategoryService.getCategories();
  }
  function handleFornecedor(conf: ISendPagination) {
    return ProviderService.getAll(conf);
  }

  function lucro(initialPrice: string, finalPrice: string): string {
    let inicio = parseFloat(initialPrice.replace(',', '.'));
    let final = parseFloat(finalPrice.replace(',', '.'));
    return (((final - inicio) / inicio) * 100).toFixed(2);
  }

  //mudar qual campo tem que tar preenchido para aparecer o calculo
  function getPercentage(campo: 'tag' | 'venda'): string {
    if (custo === undefined && tag === undefined && campo === 'tag') {
      return '0';
    }
    if (tag === undefined && custo === undefined && campo === 'venda') {
      return '0';
    }
    if (custo && sale && campo === 'tag') {
      return lucro(custo, sale);
    }
    if (sale && tag && campo === 'venda') {
      return lucro(sale, tag);
    } else {
      return '0';
    }
  }

  const initialValues: IDataProductRegiser = {
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
        if (custo && tag && sale) {
          formik.values.custePrice = parseFloat(custo.replace(',', '.'));
          formik.values.tagPrice = parseFloat(tag.replace(',', '.'));
          formik.values.salerPrice = parseFloat(sale.replace(',', '.'));
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

  return (
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
                formik.setFieldValue('providerId', newValue.id);
              }}
            />
          </Box>
          <CustomAutocomplete
            size="small"
            label="Categoria"
            placeholder="Procurar categoria"
            fetchOptions={handleCategoria}
            onUpdateValue={(newValue: any) => {
              formik.setFieldValue('categoryId', newValue.id);
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
              <Typography>{getPercentage('tag')}%</Typography>
            </Box>
            <CurrencyTextField
              size={'small'}
              label="Preço de etiqueta"
              amount={sale}
              stateFunction={setSale}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Lucro</Typography>
              <Typography>{getPercentage('venda')}%</Typography>
            </Box>

            <CurrencyTextField
              size={'small'}
              label="Preço de venda"
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
