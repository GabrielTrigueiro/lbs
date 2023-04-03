import style from "../../../../styles/Product/ProductRegiser.module.scss";
import { oneInformation } from "../../../models/product";
import styled from "@emotion/styled";
import {Table, TableCell, TableRow} from "@mui/material";

// interface props {
//     listaDeInfos: oneInformation[];
//     removerInformacao: () => void;
// }

export const ProductRegister: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.tabela}>
                <div className={style.campos}>
                    <p>Tamanho</p>
                    <p>Cor</p>
                    <p>Qtd</p>
                </div>
                {/*<div className={style.lista}>*/}
                {/*    {*/}
                {/*        data.map((row, index) => (*/}
                {/*            <ProductInfoRowTable ind={String(index)} rows={row} />*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
