import React from 'react'
import { Modal, TextField, Button, FormControl, InputLabel, MenuItem, Select, Stack, Chip } from '@mui/material';
import { useFormik } from 'formik';
import modal from "../../../styles/Client/ClientRegister.module.scss"
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState, useEffect } from "react";
import { ClienteService } from '../../services';
import { Notification } from '../notification';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setAllIndicacoes } from '../../store/reducers/indicationSlice';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearClientIndications, removeIndication, setClientIndications } from '../../store/reducers/clientIndicationSlice';
import { RegisterClient, clientValidationSchema } from '../../models/client';
import { IndicationService } from '../../services/api/indication/IndicationService';
import { dataAllIndications, dataOneIndication } from '../../models/indication';

export const ClientRegisterModal: React.FC<{ modalState: boolean, handleModal: () => void, update: ()=>void}> = ({ update, modalState, handleModal}) => {

    const [confirm, setConfirm] = useState<true | false>(false);

    const [indicState, setindicState] = useState(false);

    const [select, setSelect] = useState("");

    const [data, setData] = useState<Dayjs>(dayjs(""));

    const [tempInd, setTempInd] = useState<dataOneIndication>({ description: "", id: "", type: "" });

    const dispatch = useDispatch();

    const lista = useSelector((state: RootState) => state.indicacoes.data);
    
    const indClient = useSelector((state: RootState) => state.clientIndication.data);

    function getListaIndicacao() {
        const data = IndicationService.getInficacoes().then((response) => {
            dispatch(setAllIndicacoes(response.data.data));
        });
    };

    function addObject(object: dataOneIndication) {

        const existingObject = indClient.find(obj => obj.id === object.id);

        if (!existingObject) {
            dispatch(setClientIndications(object))
            setSelect("");
            return
        } else {
            Notification("Essa indicação já está em sua lista", "error")
            setSelect("");
            return
        }
    }

    function addInd() {
        if (indClient.length === 3) {
            Notification("Só podem haver três indicações", "error");
            setSelect("");
            return
        }
        addObject(tempInd)
    }

    function removeInd(id: string) {
        dispatch(removeIndication(id))
    }

    function changeConfirm() {
        setConfirm(!confirm);
    }

    function closeModal() {
        formik.resetForm();
        dispatch(clearClientIndications())
        handleModal();
        changeConfirm();
    }

    function createUser(newUser: RegisterClient) {
        ClienteService.Create(newUser).then((response) => {
            Notification(response.message, "success")
            update();
            handleModal();
            formik.resetForm();
            dispatch(clearClientIndications);
        })
    }

    function getCepData(ev: any) {
        const { value } = ev.target
        const cep = value?.replace(/[^0-9]/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.localidade) {
                    formik.setFieldValue("city", `${data.localidade}`)
                    formik.setFieldValue("uf", `${data.uf}`)
                    formik.setFieldValue("address", `${data.logradouro}`)
                    formik.setFieldValue("neighborhood", `${data.bairro}`)
                }
            })
    }

    function handleChange(event: SelectChangeEvent) {
        setSelect(event.target.value as string)
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
            telephone: "",
            uf: "",
            dataNascimento: "",
            indicacoesIds: [""]
        },
        validationSchema: clientValidationSchema,
        onSubmit: (values) => {
            let dataString = dayjs(formik.values.dataNascimento).format('DD-MM-YYYY');

            formik.values.dataNascimento = dataString.toString() + " 03:00";
            formik.values.indicacoesIds = indClient.map(item => item.id);

            createUser(values);
        },
        onReset(values, formikHelpers) {

        },
    });

    useEffect(() => {
        getListaIndicacao();
    }, [indClient, select])

    return (
        <>
            <Modal className={modal.modalContainer} open={modalState} onClose={changeConfirm}>
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
                                        helperText={formik.touched.cpf && formik.errors.cpf}
                                    />
                                    <DatePicker
                                        label="Data de nascimento"
                                        disableFuture
                                        value={formik.values.dataNascimento}
                                        inputFormat='DD/MM/YYYY'
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                fullWidth
                                                autoComplete='none'
                                                error={formik.touched.dataNascimento && Boolean(formik.errors.dataNascimento)}
                                                helperText={formik.touched.dataNascimento && formik.errors.dataNascimento}
                                            />
                                        )}
                                        onChange={(value) => formik.setFieldValue('dataNascimento', value, true)}
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
                                    <Stack direction="row" spacing={1} className={modal.indicacoes}>
                                        <Button onClick={() => setindicState(true)} className={modal.indicaceosButton} variant='contained'>+ Indicações</Button>
                                        {indClient.map((item, index) => (
                                            <Chip sx={{ fontSize: 9 }} size='small' key={item.id} variant='filled' label={item.type} onDelete={() => removeInd(item.id)} />
                                        ))}
                                    </Stack>
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
                                        value={formik.values.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')}
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

            <Modal className={modal.modalContainer} open={indicState} onClose={() => setindicState(false)}>
                <div className={modal.indicacaoContainer}>
                    <div className={modal.indicacaoTitle}>Cadastrar Indicação</div>
                    <div className={modal.optionContainer}>
                        <FormControl className={modal.formIndic} variant="standard">
                            <InputLabel>Indicação</InputLabel>


                            <Select value={select} onChange={handleChange}>
                                {
                                    lista.map((item, index) => (
                                        <MenuItem key={item.id} onClick={() => setTempInd(item)} value={item.type}>{item.type}</MenuItem>
                                    ))
                                }
                            </Select>


                        </FormControl>
                        <div className={modal.indicacoesActions}>
                            <Button className={modal.button} onClick={() => setindicState(false)}>Cancelar</Button>
                            <Button className={modal.button} onClick={addInd}>Confirmar</Button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}
