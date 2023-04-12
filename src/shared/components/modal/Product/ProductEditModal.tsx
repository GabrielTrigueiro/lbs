import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table, TableCell, TableRow,
  TextField
} from "@mui/material";
import styles from "../../../../styles/Product/ProductRegisterModal.module.scss";
import {useFormik} from "formik";
import {
  IDataProductRegiser,
  ProductValidationSchema,
  oneInformation,
  IDataProduct,
} from "../../../models/product";
import FormikTextField from "../../formik-text-field/FormikTextField";
import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from '@mui/material/Select';
import {ProductService} from "../../../services/api/product";
import {CategoryService} from "../../../services/api/categories/Categories_Service";
import {ICategory, ICategoryRegister} from "../../../models/categories";
import {ProviderService} from "../../../services/api/providers/ProviderService";
import {ISendPagination} from "../../../models/client";
import {ProductRegisterInfos} from "./ProductRegisterInfos";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Notification} from "../../notification";
import {IProviderCadastroInfo} from "../../../models/provider";

interface props {
  data: IDataProduct;
  state: boolean;
  handleModal: () => void;
  update: () => void;
}

export const ProductEditModal: React.FC<props> = ({handleModal, state, update, data}) => {
  const formik = useFormik({
    initialValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      quantity: data.quantidade,
      custePrice: data.custePrice,
      salerPrice: data.salerPrice,
      tagPrice: data.tagPrice,
      codeBarras: data.codeBarras,
      codeInt: data.codeInt,
      informations: data.informations,
      category: data.category,
      provider: data.provider
    },
    validationSchema: ProductValidationSchema,
    onSubmit: (values) => {
      if(idCategoria && idProvider){
          const produto: IDataProductRegiser = {
              id:formik.values.id,
              codeInt:formik.values.codeInt ,
              codeBarras:formik.values.codeBarras,
              custePrice:formik.values.custePrice,
              description:formik.values.description ,
              informations:formik.values.informations ,
              name:formik.values.name ,
              quantity:formik.values.quantity ,
              salerPrice:formik.values.salerPrice ,
              tagPrice:formik.values.tagPrice,
              categoryId: idCategoria,
              providerId: idProvider,
          }
          editProduct(produto);
      }
    },
    onReset(values, formikHelpers) {
      setSelect('');
      setIdCategoria('');
      setIdProvider('');
      setQuantidade(0);
    },
  })

  //editar
  function editProduct(objeto: IDataProductRegiser) {
    if (objeto.id) {
      ProductService.UpdateById(objeto.id, objeto).then((response) => {
        update();
        handleModal();
        formik.resetForm();
      })
    }
  }
  function addInfo(newInfo: oneInformation) {
    if (formik.values.informations) {
      formik.setFieldValue('informations', [...formik.values.informations, newInfo]);
    }
  }
  function removeByIndex(index: string) {
    if (formik.values.informations) {
      let arrayFiltrado = formik.values.informations.filter((obj) => String(obj.id) !== index);
      formik.setFieldValue('informations', [...formik.values.informations, arrayFiltrado]);
    }
  }

  const [idCategoria, setIdCategoria] = useState(formik.values.category.id);
  const [idProvider, setIdProvider] = useState(formik.values.provider.id);
  const [nameProvider, setNameProvider] = useState(formik.values.provider);
  const [quantidade, setQuantidade] = useState(formik.values.quantity);
  const [categoriasApi, setCategoriasApi] = useState<ICategory[]>([]);
  const [providersApi, setProvidersApi] = useState<IProviderCadastroInfo[]>([]);
  const [select, setSelect] = useState(formik.values.category.name);
  //dados da api
  function getCategories() {
    CategoryService.getCategories().then((response) => {
      setCategoriasApi(response.data.data);
    });
  }
  function getProviders() {
    ProviderService.getAll(search).then((response) => {
      setProvidersApi(response.data.data);
    });
  }
  //controlar o select
  function handleChange(event: SelectChangeEvent) {
    setSelect(event.target.value as string)
  }
  //search estranho
  const [value, setValue] = useState<string>("");
  let search: ISendPagination = {
    page: 0,
    pageSize: 10,
    param: "name",
    sortDirection: "DESC",
    sortField: "name",
    value: value,
  };
  //confirm
  const [confirm, setConfirm] = useState<true | false>(false);

  function handleConfirm() {
    setConfirm(!confirm);
  }

  function changeConfirmAndModal() {
    setConfirm(!confirm);
    handleModal();
    formik.resetForm();
  }

  //modal de informações
  const [infosModal, setInfosModal] = useState<true | false>(false);

  function handleInfos() {
    setInfosModal(!infosModal);
  }

  function getPercentage(initialPrice: number, finalPrice: number): string {
    return (((finalPrice - initialPrice) / initialPrice) * 100).toFixed(2);
  }

  useEffect(() => {
    getCategories();
    getProviders();
  }, [value])

  return (
    <>
      <Modal className={styles.modalContainer} open={state} onClose={handleConfirm}>
        <div className={styles.modalFormContainer}>
          <div className={styles.titulo}>
            Cadastrar Produto
          </div>
          <form className={styles.registerContainer} onSubmit={formik.handleSubmit}>
            <div className={styles.modalCima}>
              <div className={styles.modalCimaEsquerda}>
                <div className={styles.codeImage}>
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
                    error={formik.touched.codeBarras && Boolean(formik.errors.codeBarras)}
                    helperText={formik.touched.codeBarras && formik.errors.codeBarras}
                  />
                  <Box sx={{
                    background: "#D9D9D9",
                    width: '10em',
                    height: '10em',
                    marginTop: '1em',
                    textAlign: 'center'
                  }}>Imagem</Box>
                </div>
              </div>
              <div className={styles.modalCimaDireita}>
                <div className={styles.inputsCima}>
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
                    <FormControl sx={{width: "100%", marginTop: "0.3em"}} variant="standard">
                      <InputLabel>Categoria</InputLabel>
                      <Select value={select} onChange={handleChange}>
                        {
                          categoriasApi.map((item, index) => (
                            <MenuItem key={item.id} onClick={() => setIdCategoria(item.id)} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <Autocomplete
                      options={providersApi}
                      getOptionLabel={(option) => option.name}
                      value={nameProvider}
                      inputValue={nameProvider?.name}
                      onChange={(event: any, newValue: IProviderCadastroInfo | null) => {
                        if (newValue) {
                          if (newValue.id) {
                            setIdProvider(newValue.id)
                            setNameProvider(newValue)
                          }
                        }
                      }}
                      sx={{width: '100%', marginTop: "0.3em"}}
                      renderInput={(params) => <TextField {...params} label="Fornecedor" variant="standard"/>}
                    />
                    <FormikTextField
                      autoComplete="off"
                      variant="standard"
                      size="small"
                      fullWidth
                      id="quantity"
                      name="quantity"
                      label="Quantidade"
                      value={quantidade}
                      onChange={formik.handleChange}
                      error={formik.touched.quantity && Boolean(formik.errors.quantity)}
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
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </div>
                  <div className={styles.direita}>
                    <Box className={styles.tableContainer}>
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
                            {
                              formik.values.informations?.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>{row.color}</TableCell>
                                  <TableCell>{row.size}</TableCell>
                                  <TableCell>{row.quantity}</TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Button onClick={handleInfos} className={styles.button}>+ Tamanho</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceTitle}>Preço</div>
            <div className={styles.modalBaixo}>
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
                  error={formik.touched.custePrice && Boolean(formik.errors.custePrice)}
                  helperText={formik.touched.custePrice && formik.errors.custePrice}
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
                  error={formik.touched.salerPrice && Boolean(formik.errors.salerPrice)}
                  helperText={formik.touched.salerPrice && formik.errors.salerPrice}
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
                  error={formik.touched.tagPrice && Boolean(formik.errors.tagPrice)}
                  helperText={formik.touched.tagPrice && formik.errors.tagPrice}
                />
              </div>
              <div className={styles.modalBaixoDireita}>
                <Box sx={{marginTop: "2em"}}>
                  {getPercentage(formik.values.custePrice, formik.values.salerPrice)}% Margem de lucro
                </Box>
                <Box sx={{marginTop: "2em"}}>
                  {getPercentage(formik.values.salerPrice, formik.values.tagPrice)}% Margem de lucro
                </Box>
              </div>
            </div>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button onClick={handleConfirm} sx={{margin: '1em'}} className={styles.button}>Cancelar</Button>
              <Button type='submit' sx={{margin: '1em'}} className={styles.button}>Salvar</Button>
            </Box>
          </form>
        </div>
      </Modal>

      <ProductRegisterInfos
        removerPorId={removeByIndex}
        infosAr={formik.values.informations}
        onFormSubmit={addInfo}
        qtd={formik.values.quantity}
        changeState={handleInfos}
        state={infosModal}
      />

      <Dialog open={confirm}>
        <DialogTitle className={styles.confirmTitle}>Não aplicar alterações?</DialogTitle>
        <DialogActions>
          <Button className={styles.button} onClick={handleConfirm}>Cancelar</Button>
          <Button className={styles.button} onClick={changeConfirmAndModal}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
