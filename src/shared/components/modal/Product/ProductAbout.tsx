import { Box, Button, Skeleton, TextField } from '@mui/material';
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
import { ICategory } from 'shared/models/categories';
import { IProviderCadastroInfo } from 'shared/models/provider';
import { CategoryService } from 'shared/services/api/categories/Categories_Service';
import { ProviderService } from 'shared/services/api/providers/ProviderService';
import CustomAutocomplete from 'shared/components/caixa/CaixaInput/CustomAutocomplete';
import { ISendPagination } from 'shared/models/client';
import { Notification } from 'shared/components/notification';

interface erroYup {
  path: string; // O caminho do campo que falhou na validação
  message: string; // A mensagem de erro associada ao campo
  type: string; // O tipo de erro, como "required", "min", "max", etc.
}

export const ProductAbout = () => {
  const [informacoes, setInformacoes] = useState<IListaInformacoesProduto>([]);

  function handleCategoria() {
    return CategoryService.getCategories();
  }
  function handleFornecedor(conf: ISendPagination) {
    return ProviderService.getAll(conf);
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
        await ProductValidationSchema.validate(values, { abortEarly: false });
        console.log('Sem erros, pode enviar o formulário!');
      } catch (error) {
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
            <TextField
              name="custePrice"
              label="Preço de custo"
              type="number"
              value={formik.values.custePrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.custePrice && Boolean(formik.errors.custePrice)
              }
              // helperText={formik.touched.custePrice && formik.errors.custePrice}
              fullWidth
              size="small"
              autoComplete="off"
            />
            sadasdas
            <TextField
              name="tagPrice"
              label="Preço de etiqueta"
              type="number"
              value={formik.values.tagPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tagPrice && Boolean(formik.errors.tagPrice)}
              // helperText={formik.touched.tagPrice && formik.errors.tagPrice}
              fullWidth
              size="small"
              autoComplete="off"
            />
            sadasd
            <TextField
              name="salerPrice"
              label="Preço de Venda"
              type="number"
              value={formik.values.salerPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.salerPrice && Boolean(formik.errors.salerPrice)
              }
              // helperText={formik.touched.salerPrice && formik.errors.salerPrice}
              fullWidth
              size="small"
              autoComplete="off"
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
