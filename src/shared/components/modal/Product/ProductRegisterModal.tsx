import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import styles from 'styles/Product/ProductRegisterModal.module.scss';
import { useFormik } from 'formik';
import {
  IDataProductRegiser,
  ProductValidationSchema,
  oneInformation,
} from '../../../models/product';
import FormikTextField from '../../formik-text-field/FormikTextField';
import React, { useState } from 'react';
import { ProductService } from '../../../services/api/product';
import { ICategory } from '../../../models/categories';
import { IProviderCadastroInfo } from '../../../models/provider';
import { ProductRegisterInfos } from './ProductRegisterInfos';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Notification } from '../../notification';
import AutoCompleteCategory from '../../auto-complete/AutoCompleteCategory';
import AutoCompleteProvider from '../../auto-complete/AutoCompleteProvider';
import {
  Container,
  Title,
  TableStyle,
  Card,
  FormBody,
} from './TableComponents';
import useRegistrarProduto from 'shared/hooks/produtos/RegistrarProduto';

interface props {
  atualizarPagina: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({ atualizarPagina }) => {
  const { isOpen, onClose } = useRegistrarProduto();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      quantity: 0,
      custePrice: 0,
      salerPrice: 0,
      tagPrice: 0,
      codeBarras: '',
      codeInt: '',
      informations: new Array<oneInformation>(),
      categoryId: '',
      providerId: '',
    },
    validationSchema: ProductValidationSchema,
    onSubmit: (values) => {
      registerProduct(values);
    },
    onReset(values, formikHelpers) {
      setCategory({});
      setProvider({});
    },
  });
  const [provider, setProvider] = useState({});
  const [category, setCategory] = useState({});

  function handleProvider(obj: IProviderCadastroInfo) {
    formik.setFieldValue('providerId', obj.id);
    setProvider(obj);
  }

  function handleCategory(obj: ICategory) {
    formik.setFieldValue('categoryId', obj.id);
    setCategory(obj);
  }

  function addInfo(newInfo: oneInformation) {
    if (formik.values.informations) {
      formik.setFieldValue('informations', [
        ...formik.values.informations,
        newInfo,
      ]);
    }
  }

  function removeInfo(newList: oneInformation[]) {
    if (formik.values.informations) {
      formik.setFieldValue('informations', newList);
    }
  }

  const [confirm, setConfirm] = useState(false);
  const [infosModal, setInfosModal] = useState(false);

  function handleConfirm() {
    setConfirm(!confirm);
  }

  function changeConfirmAndModal() {
    setConfirm(!confirm);
    onClose();
    formik.resetForm();
  }

  function handleInfos() {
    setInfosModal(!infosModal);
  }

  function registerProduct(values: IDataProductRegiser) {
    console.log('registrando');
    ProductService.Create(values).then((response) => {
      Notification(response.message, 'success');
      atualizarPagina();
      // handleModal();
      formik.resetForm();
    });
  }

  function getPercentage(initialPrice: number, finalPrice: number): string {
    return (((finalPrice - initialPrice) / initialPrice) * 100).toFixed(2);
  }

  return (
    <>
      <Container open={isOpen} onClose={handleConfirm}>
        <Card>
          <Title>Cadastrar Produto</Title>
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
                  categoria={category}
                />
                <AutoCompleteProvider
                  onSubmit={handleProvider}
                  fornecedor={provider}
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
                      <TableHead>
                        <TableRow>
                          <TableCell>Cor</TableCell>
                          <TableCell>Tamanho</TableCell>
                          <TableCell>Quantidade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formik.values.informations.map((row, index) => (
                          <TableRow
                            sx={{
                              'td:first-child': {
                                borderLeftColor: 'transparent',
                              },
                              verticalAlign: 'top',
                            }}
                            key={index}
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
                onClick={handleConfirm}
                sx={{ margin: '1em' }}
                variant="contained"
              >
                Cancelar
              </Button>
              <Button type="submit" sx={{ margin: '1em' }} variant="contained">
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
          <Button className={styles.button} onClick={handleConfirm}>
            Cancelar
          </Button>
          <Button className={styles.button} onClick={changeConfirmAndModal}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
