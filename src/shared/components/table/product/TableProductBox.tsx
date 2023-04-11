import {ProductCard} from "./ProductCard";
import styled from "@emotion/styled";
import {IDataProduct} from "../../../models/product";
import {Box} from "@mui/material";

const BoxTable = styled(Box)({
    backgroundColor:"#3f3f3f",
    height: "100%",
    maxWidth: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
    display: "grid",
    padding: "1em",
    gridTemplateColumns: "repeat(auto-fit, minmax(10%, 1fr))",
    gap: "2em"
})
interface props {
    lista: IDataProduct[];
    update: () => void;
}

export const TableProductBox: React.FC<props> = ({update, lista}) =>{
    return(
        <BoxTable>
            {lista.map((row) => (
                <ProductCard data={row} update={update}/>
            ))}
        </BoxTable>
    )
}