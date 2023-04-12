import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Modal,
    Table,
    TableCell,
    TableRow,
    TextField
} from "@mui/material";
import styles from "../../../../styles/Product/ProductRegisterInfoTable.module.scss";
import { useState } from "react";
import { oneInformation } from "../../../models/product";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { TableSubMenu } from "../../client-submenu/TableSubMenu";
import { Notification } from "../../notification";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

interface props {
    removerPorId: (index: string) => void;
    qtd: number;
    state: boolean;
    infosAr?: oneInformation[];
    onFormSubmit: (formValues: oneInformation) => void;
    changeState: () => void;
}

export const ProductRegisterInfos: React.FC<props> = ({ changeState, state, qtd, onFormSubmit, infosAr, removerPorId }) => {

    //confirm
    const [confirm, setConfirm] = useState<true | false>(false);
    function handleConfirm() {
        setConfirm(!confirm);
    }
    function changeConfirmAndModal() {
        setConfirm(!confirm);
        changeState();
    }

    //manipulando o objeto
    const [formValues, setFormValues] = useState<oneInformation>({
        color: '',
        size: '',
        quantity: 0,
    });

    function handleCorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({ ...formValues, color: event.target.value });
    }

    function handleTamanhoChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({ ...formValues, size: event.target.value });
    }

    function handleQuantidadeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({ ...formValues, quantity: Number(event.target.value) });
    }

    function handlebutton() {
        if (formValues.color == '' && formValues.size == '') {
            Notification("Preencha ao menos um campo de informação", "error");
            return
        }
        if (formValues.quantity < 0) {
            Notification("Quantidade inválida", "error");
            return
        }
        else {
            onFormSubmit(formValues);
            setFormValues({ color: '', size: '', quantity: 0 });
        }
    }

    function handleButtonClick() {
        changeState();
    }

    return (
        <>
            <Modal className={styles.container} open={state} onClose={handleConfirm}>
                <div className={styles.table}>
                    <div className={styles.titulo}>TAMANHOS</div>
                    <div className={styles.form}>
                        <div className={styles.inputs}>
                            <TextField label="Cor" value={formValues.color} onChange={handleCorChange} variant={'standard'} />
                            <TextField label="Tamanho" value={formValues.size} onChange={handleTamanhoChange} variant={'standard'} />
                            <TextField
                                type="number"
                                inputProps={{
                                    inputprops: { min: 0 }
                                }}
                                label="Quantidade"
                                value={formValues.quantity}
                                onChange={handleQuantidadeChange}
                                variant={'standard'}
                            />
                            <Button onClick={handlebutton} className={styles.button}>Adicionar</Button>
                        </div>

                        <TableContainer className={styles.tableContainer}>
                            <Table>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell>Cor</TableCell>
                                        <TableCell>Tamanho</TableCell>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        infosAr ?
                                        infosAr.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.color}</TableCell>
                                                <TableCell>{row.size}</TableCell>
                                                <TableCell>{row.quantity}</TableCell>
                                                <TableCell><DoDisturbOnIcon onClick={()=>removerPorId(String(index))} sx={{margin:"auto 0"}}/></TableCell>
                                            </TableRow>
                                        )) : <></>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className={styles.footer}>
                            <div>Qtd. Total: `{qtd}`</div>
                            <div>
                                <Button onClick={handleConfirm} className={styles.button}>Fechar</Button>
                                <Button onClick={handleButtonClick} className={styles.button}>Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

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
