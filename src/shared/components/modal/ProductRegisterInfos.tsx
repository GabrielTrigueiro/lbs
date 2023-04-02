import { Button, Dialog, DialogActions, DialogTitle, Modal, TextField } from "@mui/material";
import styles from "../../../styles/Product/ProductRegisterInfos.module.scss";
import { useState } from "react";
import { oneInformation } from "../../models/product";
import { ProductInfoRow } from "./ProductInfoRow";

interface props {
    qtd: string;
    infosAr: oneInformation[];
    state: boolean;
    addInfo: (e:oneInformation) => void;
    removeInfo: () => void;
    changeState: () => void;
}

export const ProductRegisterInfos: React.FC<props> = ({ changeState, state, qtd, addInfo, infosAr, removeInfo}) => {

    //confirm
    const [confirm, setConfirm] = useState<true | false>(false);
    function handleConfirm() {
        setConfirm(!confirm);
    }
    function changeConfirmAndModal() {
        setConfirm(!confirm);
        changeState();
    }

    //states
    const [size, setSize] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [quant, setQuant] = useState<number>(0);
    const [info, setInfo] = useState<oneInformation>({size: size, color: color, quantity: quant});
    const changeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSize(newValue);
    };
    const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setColor(newValue);
    };
    const changeQuant = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setQuant(Number(newValue));
    };
      

    return (
        <>
            <Modal className={styles.container} open={state} onClose={handleConfirm}>
                <div className={styles.table}>
                    <div className={styles.titulo}>TAMANHOS</div>
                    <div className={styles.form}>
                        <div className={styles.inputs}>
                            <TextField value={size} onChange={changeSize} label='Tamanho' variant="standard"/>
                            <TextField value={color} onChange={changeColor} label='Cor' variant="standard"/>
                            <TextField value={quant} onChange={changeQuant} label='Quantidade' variant="standard"/>
                            <Button className={styles.button}>Adicionar</Button>
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
                                <Button className={styles.button} onClick={()=>addInfo(info)}>Salvar</Button>
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
