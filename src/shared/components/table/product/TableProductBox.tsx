import {ProductCard} from "./ProductCard";
import {IDataProduct} from "../../../models/product";

interface props {
    productList: IDataProduct[];
}

export const TableProductBox: React.FC<props> = ({productList}) =>{
    return(
        <>
            {
                productList.map((row) => (
                    <ProductCard data={row}/>
                ))
            }
        </>
    )
}