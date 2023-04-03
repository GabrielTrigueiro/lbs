import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Modal, TextField } from "@mui/material"
import { useFormik } from 'formik'
import styles from "../../../../styles/Categories/CategoryRegisterModal.module.scss"
import { Notification } from '../../notification'
import { ICategoryRegister, categoryRegisterSchema } from '../../../models/categories'
import { CategoryService } from '../../../services/api/categories/Categories_Service'

export const CategoryEditModal: React.FC<{ 
    categoria: ICategoryRegister,
    modalState: boolean,
    handleModal: () => void,
    update: () => void;
}> = ({ handleModal, modalState, update, categoria }) => {

    //modal de confirmar
    const [confirm, setConfirm] = useState<true | false>(false);

    function changeConfirm() {
        setConfirm(!confirm);
    }

    function closeModal() {
        handleModal();
        changeConfirm();
        formik.resetForm();
    }

    function editCateogry(novaCategoria: ICategoryRegister) {
        if(novaCategoria.id)
        CategoryService.UpdateById(novaCategoria.id, novaCategoria).then((response) => {
            Notification("Categoria editada com sucesso", "success")
            update();
            handleModal();
        })
    }

    const formik = useFormik({
        initialValues: {
            id: categoria.id,
            name: categoria.name,
            code: categoria.code,
            description: categoria.description,
        },
        validationSchema: categoryRegisterSchema,
        onSubmit: (values) => {
            editCateogry(values)
            formik.resetForm();
        },
        onReset(values, formikHelpers) {

        }
    })

    return (
        <>
            <Modal className={styles.container} open={modalState} onClose={changeConfirm}>
                <div className={styles.modalFormContainer}>
                    <div className={styles.titulo}>
                        Editar Categoria
                    </div>
                    <div className={styles.form}>
                        <div className={styles.fields}>
                            <form className={styles.innerForm} onSubmit={formik.handleSubmit}>
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    autoComplete="off"
                                    variant="standard"
                                    size="small"
                                    id="name"
                                    name="name"
                                    label="Nome"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}

                                    autoComplete="off"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    id="code"
                                    name="code"
                                    label="Código"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.code && Boolean(formik.errors.code)}
                                    helperText={formik.touched.code && formik.errors.code}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}

                                    autoComplete="off"
                                    variant="standard"
                                    size="small"
                                    id="description"
                                    name="description"
                                    label="Descrição"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <div className={styles.botoes}>
                                    <div className={styles.botoesFlex}>
                                        <Button type="reset" onClick={changeConfirm} className={styles.button} variant="contained">Cancelar</Button>
                                        <Button type="submit" className={styles.button} variant="contained">Salvar</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <Dialog open={confirm}>
                <DialogTitle className={styles.confirmTitle}>Não aplicar alterações?</DialogTitle>
                <DialogActions>
                    <Button className={styles.button} onClick={changeConfirm}>Cancelar</Button>
                    <Button className={styles.button} onClick={closeModal}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
