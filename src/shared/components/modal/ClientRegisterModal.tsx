import React from 'react'
import { clientValidationSchema, RegisterClient } from '../../models/client';
import { Modal, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import modal from "../../../styles/Client/ClientRegister.module.scss"
import {Dialog, DialogActions, DialogTitle} from '@mui/material';
import {useState} from "react";
import { ClienteService } from '../../services';
import { Notification } from '../notification';

export const ClientRegisterModal: React.FC<{modalState: boolean, handleModal: () => void}> = ({modalState, handleModal}) => {
    
    const [confirm, setConfirm] = useState<true | false>(false);
    
    function changeConfirm() {
        setConfirm(!confirm);
    }
    
    function closeModal() {
        formik.resetForm();
        handleModal();
        changeConfirm();
    }

    function createUser(newUser: RegisterClient) {
        ClienteService.Create(newUser).then((response) => {
            Notification(response.message, "success")
            handleModal();
        })
    }

    const formik = useFormik({
        initialValues: {
            address: "",
            cell: "",
            cep: "",
            city: "",
            cpf: "",
            email: "",
            name: "",
            neighborhood: "",
            number: "",
            rg: "",
            sex: "",
            telephone: "",
            uf: ""
        },
        validationSchema: clientValidationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            createUser(values);
        },
        onReset(values, formikHelpers) {
            
        },
    });

    function getCepData (ev: any) {
        const {value} = ev.target
        const cep = value?.replace(/[^0-9]/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if(data.localidade){
            formik.setFieldValue("city", `${data.localidade}`)
            formik.setFieldValue("uf", `${data.uf}`)
            formik.setFieldValue("address", `${data.logradouro}`)
            formik.setFieldValue("neighborhood", `${data.bairro}`)
          }
        })
    }

    return (
        <>
            <Modal className={modal.modalContainer} open={modalState} onClose={handleModal}>
                <div className={modal.modalFormContainer}>
                    <div className={modal.titulo}>
                        Cadastrar Cliente
                    </div>
                    <div className={modal.form}>
                        <form className={modal.innerForm} onSubmit={formik.handleSubmit}>
                            <div className={modal.up}>
                                <div className={modal.upLeft}>
                                    <TextField
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
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="sex"
                                        name="sex"
                                        label="Genero"
                                        value={formik.values.sex}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sex && Boolean(formik.errors.sex)}
                                        helperText={formik.touched.sex && formik.errors.sex}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="rg"
                                        name="rg"
                                        label="RG"
                                        value={formik.values.rg}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rg && Boolean(formik.errors.rg)}
                                        helperText={formik.touched.rg && formik.errors.rg}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="cpf"
                                        name="cpf"
                                        label="CPF"
                                        value={formik.values.cpf}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                        helperText={formik.touched.name && formik.errors.cpf}
                                    />
                                </div>
                                <div className={modal.upRight}>
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="telephone"
                                        name="telephone"
                                        label="Telefone"
                                        value={formik.values.telephone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                                        helperText={formik.touched.telephone && formik.errors.telephone}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="cell"
                                        name="cell"
                                        label="Celular"
                                        value={formik.values.cell}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cell && Boolean(formik.errors.cell)}
                                        helperText={formik.touched.cell && formik.errors.cell}
                                    />
                                </div>
                            </div>
                            <div className={modal.subtitulo}>Informações de endereço</div>
                            <div className={modal.down}>
                                <div className={modal.downLeft}>
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="uf"
                                        name="uf"
                                        label="UF"
                                        value={formik.values.uf}
                                        onChange={formik.handleChange}
                                        error={formik.touched.uf && Boolean(formik.errors.uf)}
                                        helperText={formik.touched.uf && formik.errors.uf}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Endereço"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="cep"
                                        name="cep"
                                        label="CEP"
                                        value={formik.values.cep}
                                        onBlur={getCepData}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cep && Boolean(formik.errors.cep)}
                                        helperText={formik.touched.cep && formik.errors.cep}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="city"
                                        name="city"
                                        label="Cidade"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                </div>
                                <div className={modal.downRight}>
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="neighborhood"
                                        name="neighborhood"
                                        label="Bairro"
                                        value={formik.values.neighborhood}
                                        onChange={formik.handleChange}
                                        error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                                        helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        id="number"
                                        name="number"
                                        label="Número da residência"
                                        value={formik.values.number}
                                        onChange={formik.handleChange}
                                        error={formik.touched.number && Boolean(formik.errors.number)}
                                        helperText={formik.touched.number && formik.errors.number}
                                    />
                                </div>
                            </div>
                            <div className={modal.submit}>
                                <Button type='reset' onClick={changeConfirm} className={modal.button} variant="contained">Cancelar</Button>
                                <Button type="submit" className={modal.button} variant="contained">Salvar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <Dialog open={confirm}>
                <DialogTitle className={modal.confirmTitle}>Não aplicar alterações?</DialogTitle>
                <DialogActions>
                    <Button className={modal.button} onClick={changeConfirm}>Cancelar</Button>
                    <Button className={modal.button} onClick={closeModal}>Confirmar</Button>
                </DialogActions>
            </Dialog>   
        </>
    )
}
