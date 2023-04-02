import { Button, Dialog, DialogActions, DialogTitle, Modal, TextField } from "@mui/material";
import styles from "../../../styles/Product/ProductRegisterInfos.module.scss";
import { useState } from "react";
import { oneInformation } from "../../models/product";
import { ProductInfoRow } from "./ProductInfoRow";

interface props {
    qtd: string;
    state: boolean;
    infosAr: oneInformation[];
    onFormSubmit: (formValues: oneInformation) => void;
    changeState: () => void;
}

export const ProductRegisterInfos: React.FC<props> = ({ changeState, state, qtd, onFormSubmit, infosAr }) => {

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

    function handleButtonClick() {
        onFormSubmit(formValues);
        setFormValues({ color: '', size: '', quantity: 0 });
    }

    return (
        <>
            <Modal className={styles.container} open={state} onClose={handleConfirm}>
                <div className={styles.table}>
                    <div className={styles.titulo}>TAMANHOS</div>
                    <div className={styles.form}>
                        <div className={styles.inputs}>
                            <TextField label="Cor" value={formValues.color} onChange={handleCorChange} />
                            <TextField label="Tamanho" value={formValues.size} onChange={handleTamanhoChange} />
                            <TextField label="Quantidade" type="number" value={formValues.quantity} onChange={handleQuantidadeChange} />
                            <Button onClick={handleButtonClick} className={styles.button}>Adicionar</Button>
                        </div>
                        <div className={styles.tabelaRows}>
                            {infosAr.map((row, index) =>(
                                <ProductInfoRow ind={String(index)} rows={row}/>
                            ))}
                        </div>
                        <div className={styles.footer}>
                            <div>Qtd. Total: `{qtd}`</div>
                            <div>
                                <Button onClick={handleConfirm} className={styles.button}>Fechar</Button>
                                <Button className={styles.button}>Salvar</Button>
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
