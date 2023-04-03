import React, { useState } from 'react'
import {Button, Dialog, DialogActions, DialogTitle, Modal, TextField} from "@mui/material"
import { useFormik } from 'formik'
import { indicationRegisterSchema, registerIndication} from '../../../models/indication'
import styles from "../../../../styles/Indication/IndicationRegisterModal.module.scss"
import { IndicationService } from '../../../services/api/indication/IndicationService'
import { AxiosError } from 'axios'
import { Notification } from '../../notification'

export const IndicationRegisterModal: React.FC<{modalState: boolean, handleModal: () => void, update: () => void;}> = ({handleModal, modalState, update}) => {

    //modal de confirmar
    const [confirm, setConfirm] = useState<true | false>(false);

    function changeConfirm() {
        setConfirm(!confirm);
    }

    function closeModal() {
        formik.resetForm();
        handleModal();
        changeConfirm();
    }

    function createIndication(novaIndicacao: registerIndication) {
        IndicationService.createIndication(novaIndicacao).then((response) => {
            Notification(response.message, "success")
            update();
            handleModal();
        })
    }
  
    const formik = useFormik({
        initialValues: {
            type: "",
            description: "",
        },
        validationSchema: indicationRegisterSchema,
        onSubmit: (values) => {
            createIndication(values)
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
                            Cadastrar Indicação
                        </div>
                        <div className={styles.form}>
                            <div className={styles.fields}>
                                <form className={styles.innerForm} onSubmit={formik.handleSubmit}>
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="type"
                                        name="type"
                                        label="Tipo"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                        helperText={formik.touched.type && formik.errors.type}
                                    />
                                    <TextField
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
                                    <div className={styles.botoes}>
                                        <Button type="reset" onClick={changeConfirm} className={styles.button} variant="contained">Cancelar</Button>
                                        <Button type="submit" className={styles.button} variant="contained">Salvar</Button>
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
