import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import styles from '../../../../styles/Product/ProductRegisterModal.module.scss';
import { useFormik } from 'formik';
import {
  IDataProductRegiser,
  ProductValidationSchema,
  IProductInformation,
  IDataProduct,
} from '../../../models/product';
import FormikTextField from '../../formik-text-field/FormikTextField';
import React, { useEffect, useState } from 'react';
import { ProductService } from '../../../services/api/product';
import { ICategory } from '../../../models/categories';
import { ProductRegisterInfos } from './ProductRegisterInfos';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { IProviderCadastroInfo } from '../../../models/provider';
import AutoCompleteProvider from '../../auto-complete/AutoCompleteProvider';
import AutoCompleteCategory from '../../auto-complete/AutoCompleteCategory';
import {
  Card,
  Container,
  FormBody,
  TableStyle,
  Title,
} from './TableComponents';

interface Iprops {
  data: IDataProduct;
  state: boolean;
  handleModal: () => void;
  update: () => void;
}

export const ProductEditModal = ({
  data,
  handleModal,
  state,
  update,
}: Iprops) => {
  const formik = useFormik({
    initialValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      custePrice: data.custePrice,
      salerPrice: data.salerPrice,
      tagPrice: data.tagPrice,
      codeBarras: data.codeBarras,
      codeInt: data.codeInt,
      informations: data.informations,
      category: data.category,
      provider: data.provider,
    },
    enableReinitialize: true,
    validationSchema: ProductValidationSchema,
    onSubmit: (values) => {
      if (formik.values.provider.id && formik.values.category.id) {
        const produto: IDataProductRegiser = {
          id: formik.values.id,
          codeInt: formik.values.codeInt,
          codeBarras: formik.values.codeBarras,
          custePrice: formik.values.custePrice,
          description: formik.values.description,
          informations: formik.values.informations,
          name: formik.values.name,
          quantity: formik.values.quantity,
          salerPrice: formik.values.salerPrice,
          tagPrice: formik.values.tagPrice,
          categoryId: formik.values.category.id,
          providerId: formik.values.provider.id,
        };
        editProduct(produto);
      }
    },
    onReset(values, formikHelpers) {},
  });

  function handleProvider(obj: IProviderCadastroInfo) {
    formik.setFieldValue('provider', obj);
  }

  function handleCategory(obj: ICategory) {
    formik.setFieldValue('category', obj);
  }

  function editProduct(objeto: IDataProductRegiser) {
    if (objeto.id) {
      ProductService.UpdateById(objeto.id, objeto).then((response) => {
        handleModal();
        formik.resetForm();
        update();
      });
    }
  }

  function addInfo(newInfo: IProductInformation) {
    if (formik.values.informations) {
      formik.setFieldValue('informations', [
        ...formik.values.informations,
        newInfo,
      ]);
    }
  }

  function removeInfo(newList: IProductInformation[]) {
    if (formik.values.informations) {
      formik.setFieldValue('informations', newList);
    }
  }

  const [confirm, setConfirm] = useState<true | false>(false);

  function handleConfirm() {
    setConfirm(!confirm);
  }

  function changeConfirmAndModal() {
    setConfirm(!confirm);
    handleModal();
    formik.resetForm();
  }

  const [infosModal, setInfosModal] = useState<true | false>(false);

  function handleInfos() {
    setInfosModal(!infosModal);
  }

  function getPercentage(initialPrice: number, finalPrice: number): string {
    return (((finalPrice - initialPrice) / initialPrice) * 100).toFixed(2);
  }

  return (
    <>
      <Container open={state} onClose={handleConfirm}>
        <Card>
          <Title>Editar Produto</Title>
          <FormBody onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="codeBarras"
                  name="codeBarras"
                  label="Código de barras"
                  value={formik.values.codeBarras}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.codeBarras &&
                    Boolean(formik.errors.codeBarras)
                  }
                  helperText={
                    formik.touched.codeBarras && formik.errors.codeBarras
                  }
                />
                <Box
                  sx={{
                    background: '#D9D9D9',
                    width: '10em',
                    height: '10em',
                    marginTop: '1em',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  Imagem
                </Box>
              </Box>
              <div className={styles.esquerda}>
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="name"
                  name="name"
                  label="Nome completo"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <AutoCompleteCategory
                  onSubmit={handleCategory}
                  categoria={formik.values.category}
                />
                <AutoCompleteProvider
                  onSubmit={handleProvider}
                  fornecedor={formik.values.provider}
                />
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="Quantidade"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.quantity && Boolean(formik.errors.quantity)
                  }
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="description"
                  name="description"
                  label="Descrição"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TableStyle>
                  <TableContainer>
                    <Table>
                      <TableHead className={styles.tableHead}>
                        <TableRow>
                          <TableCell>Cor</TableCell>
                          <TableCell>Tamanho</TableCell>
                          <TableCell>Quantidade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={styles.tableBody}>
                        {formik.values.informations?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              'td:first-child': {
                                borderLeftColor: 'transparent',
                              },
                              verticalAlign: 'top',
                            }}
                          >
                            <TableCell>{row.color}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableStyle>
                <Button
                  variant={'contained'}
                  sx={{ margin: '2em auto' }}
                  onClick={handleInfos}
                >
                  + Tamanho
                </Button>
              </Box>
            </Box>
            <Typography
              sx={{ borderBottom: '1px solid gray', margin: 'auto 0.7em' }}
            >
              Preço
            </Typography>
            <Box sx={{ display: 'flex', margin: 'auto 0' }}>
              <div className={styles.modalBaixoEsquerda}>
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="custePrice"
                  name="custePrice"
                  label="Custo"
                  value={formik.values.custePrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.custePrice &&
                    Boolean(formik.errors.custePrice)
                  }
                  helperText={
                    formik.touched.custePrice && formik.errors.custePrice
                  }
                />
              </div>
              <div className={styles.modalBaixoMeio}>
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="salerPrice"
                  name="salerPrice"
                  label="Preço"
                  value={formik.values.salerPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.salerPrice &&
                    Boolean(formik.errors.salerPrice)
                  }
                  helperText={
                    formik.touched.salerPrice && formik.errors.salerPrice
                  }
                />
                <FormikTextField
                  autoComplete="off"
                  variant="standard"
                  size="small"
                  fullWidth
                  id="tagPrice"
                  name="tagPrice"
                  label="Preço de etiqueta"
                  value={formik.values.tagPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tagPrice && Boolean(formik.errors.tagPrice)
                  }
                  helperText={formik.touched.tagPrice && formik.errors.tagPrice}
                />
              </div>
              <div className={styles.modalBaixoDireita}>
                <Box sx={{ marginTop: '2em' }}>
                  {getPercentage(
                    formik.values.custePrice,
                    formik.values.salerPrice
                  )}
                  % Margem de lucro
                </Box>
                <Box sx={{ marginTop: '2em' }}>
                  {getPercentage(
                    formik.values.salerPrice,
                    formik.values.tagPrice
                  )}
                  % Margem de lucro
                </Box>
              </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant={'contained'}
                onClick={handleConfirm}
                sx={{ margin: '1em' }}
              >
                Cancelar
              </Button>
              <Button
                variant={'contained'}
                type="submit"
                sx={{ margin: '1em' }}
              >
                Salvar
              </Button>
            </Box>
          </FormBody>
        </Card>
      </Container>

      <ProductRegisterInfos
        removerPorId={removeInfo}
        infosAr={formik.values.informations}
        onFormSubmit={addInfo}
        qtd={formik.values.quantity}
        changeState={handleInfos}
        state={infosModal}
      />

      <Dialog open={confirm}>
        <DialogTitle className={styles.confirmTitle}>
          Não aplicar alterações?
        </DialogTitle>
        <DialogActions sx={{ margin: '0 auto' }}>
          <Button
            variant={'contained'}
            className={styles.button}
            onClick={handleConfirm}
          >
            Cancelar
          </Button>
          <Button
            variant={'contained'}
            className={styles.button}
            onClick={changeConfirmAndModal}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
