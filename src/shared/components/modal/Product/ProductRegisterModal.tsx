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
import { useFormik } from "formik";
import { ProductValidationSchema, oneInformation } from "../../../models/product";
import FormikTextField from "../../formik-text-field/FormikTextField";
import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { ProductService } from "../../../services/api/product";
import { CategoryService } from "../../../services/api/categories/Categories_Service";
import { ICategory, ICategoryRegister } from "../../../models/categories";
import { ProviderService } from "../../../services/api/providers/ProviderService";
import { ISendPagination } from "../../../models/client";
import { IProviderCadastroInfo } from "../../../models/provider";
import { ProductRegisterInfos } from "./ProductRegisterInfos";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

interface props {
    state: boolean;
    handleModal: () => void;
    update: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({ handleModal, state, update }) => {
    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            quantidade: "",
            custePrice: "",
            salerPrice: "",
            tagPrice: "",
            codeBarras: "",
            codeInt: "",
            informations: [],
            categoryId: "",
            providerId: ""
        },
        validationSchema: ProductValidationSchema,
        onSubmit: (values) => {
            formik.values.categoryId = idCategoria;
            formik.values.providerId = value;
            formik.values.quantidade = quantidade;
            console.log(values)
        },
        onReset(values, formikHelpers) {
            setSelect('');
            setIdCategoria('');
            setIdProvider('');
            setQuantidade('');
        },
    })

    //infos que entrarão no submit
    const [infos, setInfos] = useState<oneInformation[]>([]);
    function handleFormSubmit(formValues: oneInformation) {
        setInfos([...infos, formValues]);
    }

    const [idCategoria, setIdCategoria] = useState("");
    const [idProvider, setIdProvider] = useState("");
    const [nameProvider, setNameProvider] = useState<IProviderCadastroInfo>();
    const [quantidade, setQuantidade] = useState("");

    //dados da api
    const [categoriasApi, setCategoriasApi] = useState<ICategory[]>([]);
    function getCategories() {
        CategoryService.getCategories().then((response) => {
            setCategoriasApi(response.data.data);
        });
    }

    //search estranho
    const [value, setValue] = useState<string>("");
    const [pages, setPages] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(5)
    const [actualpage, setActualPage] = useState<number>(0)
    const [selectContent, setSelectContent] = useState('5');
    let search: ISendPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDiresction: "DESC",
        sortField: "name",
        value: value,
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    //pegando providers da api
    const [providersApi, setProvidersApi] = useState<IProviderCadastroInfo[]>([]);
    function getProviders() {
        ProviderService.getAll(search).then((response) => {
            setProvidersApi(response.data.data);
        });
    }

    //controlar o select
    const [select, setSelect] = useState("");
    function handleChange(event: SelectChangeEvent) {
        setSelect(event.target.value as string)
    }

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
                    <form className={styles.registerContainer}>
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
                                    <Box sx={{ background: "#D9D9D9", width: '10em', height: '10em', marginTop: '1em', textAlign: 'center' }}>Imagem</Box>
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
                                        <FormControl sx={{ width: "100%", marginTop: "0.3em" }} variant="standard">
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
                                            getOptionLabel={(option)=>option.name}
                                            value={nameProvider}
                                            inputValue={nameProvider?.name}
                                            onChange={(event: any, newValue: IProviderCadastroInfo|null) => {
                                                if(newValue){
                                                    if(newValue.id){
                                                        setIdProvider(newValue.id)
                                                    }
                                                }
                                            }}
                                            sx={{ width: '100%', marginTop: "0.3em" }}
                                            renderInput={(params) => <TextField {...params} label="Fornecedor" variant="standard" />}
                                        />
                                        <FormikTextField
                                            autoComplete="off"
                                            variant="standard"
                                            size="small"
                                            fullWidth
                                            id="quantidade"
                                            name="quantidade"
                                            label="Quantidade"
                                            value={formik.values.quantidade}
                                            onChange={formik.handleChange}
                                            error={formik.touched.quantidade && Boolean(formik.errors.quantidade)}
                                            helperText={formik.touched.quantidade && formik.errors.quantidade}
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
                                            <TableContainer >
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
                                                            infos.map((row, index) => (
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
                                    id="tagPrice"
                                    name="tagPrice"
                                    label="Preço de etiqueta"
                                    value={formik.values.tagPrice}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tagPrice && Boolean(formik.errors.tagPrice)}
                                    helperText={formik.touched.tagPrice && formik.errors.tagPrice}
                                />
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
                            </div>
                            <div className={styles.modalBaixoDireita}>
                                <Box sx={{marginTop:"2em"}}>Margem de lucro</Box>
                                <Box sx={{marginTop:"2em"}}>Margem de lucro</Box>
                            </div>
                        </div>
                            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                <Button onClick={handleConfirm} sx={{margin:'1em'}} className={styles.button}>Cancelar</Button>
                                <Button onClick={handleModal} sx={{margin:'1em'}} className={styles.button}>Salvar</Button>
                            </Box>
                    </form>
                </div>
            </Modal>

            <ProductRegisterInfos
                infosAr={infos}
                onFormSubmit={handleFormSubmit}
                qtd={formik.values.quantidade}
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
