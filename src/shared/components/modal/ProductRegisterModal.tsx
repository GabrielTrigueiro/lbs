import { FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import styles from "../../../styles/Product/ProductRegisterModal.module.scss";
import { useFormik } from "formik";
import { ProductValidationSchema } from "../../models/product";
import FormikTextField from "../formik-text-field/FormikTextField";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { ProductService } from "../../services/api/product";
import { CategoryService } from "../../services/api/categories/Categories_Service";
import { ICategory, ICategoryRegister } from "../../models/categories";

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
            formik.values.providerId = idCategoria;
            alert(values)
        },
        onReset(values, formikHelpers) {

        },
    })

    //dados que vao entrar no formulario
    const [idCategoria, setIdCategoria] = useState("");
    const [idProvider, setIdProvider] = useState("");

    //dados da api
    const [categoriasApi, setCategoriasApi] = useState<ICategory[]>([]);
    function getCategories() {
        CategoryService.getCategories().then((response) => {
            setCategoriasApi(response.data.data);
        });
    }

    //controlar o select
    const [select, setSelect] = useState("");
    function handleChange(event: SelectChangeEvent) {
        setSelect(event.target.value as string)
    }

    useEffect(() => {
        getCategories();
    })

    return (
        <>
            <Modal className={styles.modalContainer} open={state} onClose={handleModal}>
                <div className={styles.modalFormContainer}>
                    <div className={styles.titulo}>
                        Cadastrar Produto
                    </div>
                    <form className={styles.form}>
                        <div className={styles.up}>
                            <div className={styles.upLeft}>
                                <FormikTextField
                                    autoComplete="off"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    id="codeBarras"
                                    name="codeBarras"
                                    label="*Código de Barras"
                                    value={formik.values.codeBarras}
                                    onChange={formik.handleChange}
                                    error={formik.touched.codeBarras && Boolean(formik.errors.codeBarras)}
                                    helperText={formik.touched.codeBarras && formik.errors.codeBarras}
                                />
                                <div className={styles.imagem}>
                                    Imagem
                                </div>
                            </div>
                            <div className={styles.upRight}>
                                <FormikTextField
                                    autoComplete="off"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="*Nome"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <div className={styles.infos}>
                                    <div className={styles.infosLeft}>
                                        <FormControl sx={{width: "100%"}} variant="standard">
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
                                            helperText={formik.touched.description && formik.errors.codeBarras}
                                        />
                                    </div>
                                    <div className={styles.infosRight}>
                                        <FormikTextField
                                            autoComplete="off"
                                            variant="standard"
                                            size="small"
                                            fullWidth
                                            id="codeBarras"
                                            name="codeBarras"
                                            label="*Código de Barras"
                                            value={formik.values.codeBarras}
                                            onChange={formik.handleChange}
                                            error={formik.touched.codeBarras && Boolean(formik.errors.codeBarras)}
                                            helperText={formik.touched.codeBarras && formik.errors.codeBarras}
                                        />
                                        <FormikTextField
                                            autoComplete="off"
                                            variant="standard"
                                            size="small"
                                            fullWidth
                                            id="quantidade"
                                            name="quantidade"
                                            label="*Quantidade"
                                            value={formik.values.quantidade}
                                            onChange={formik.handleChange}
                                            error={formik.touched.quantidade && Boolean(formik.errors.quantidade)}
                                            helperText={formik.touched.quantidade && formik.errors.quantidade}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.mid}>
                            2
                        </div>
                        <div className={styles.down}>
                            3
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
