import style from "../../../../styles/Product/ProductRegiser.module.scss";
import styled from "@emotion/styled";
import {IDataProduct, oneInformation} from "../../../models/product";

interface props {
    data: IDataProduct;
    //removerInformacao: () => void;
}

export const ProductCard:React.FC<props> = ({data}) =>{
    return (
        <div>
            card
        </div>
    )
}

