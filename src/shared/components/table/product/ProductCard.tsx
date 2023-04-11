import styled from "@emotion/styled";
import {IDataProduct, oneInformation} from "../../../models/product";
import {Box, Typography} from "@mui/material";
import {ProductSubMenu} from "../../product-submenu/ProductSubMenu";

const BoxCard = styled(Box)({
    backgroundColor:"#fff",
    height:"14em",
    width:"11em",
    borderRadius:"1em",
    padding:"0.5em",
})

const BoxImagem = styled(Box)({
    backgroundColor:"#000",
    height:"50%",
    width:"100%",
    borderRadius:"0.5em",
})

const BoxName = styled.div({
    textAlign:"center",
    marginTop:"0.5em"
})

const BoxInfos = styled(Box)({
    display:"flex",
    flexDirection:"column",
    fontSize:"0.8pc",
    //background:"#345",
    marginTop:"0.5em"
})

interface props {
    data: IDataProduct;
    update: () => void;
}

export const ProductCard:React.FC<props> = ({data, update}) =>{
    return (
        <BoxCard>
            <BoxImagem>Imagem</BoxImagem>
            <BoxName>{data.name}</BoxName>
            <BoxInfos>
                <Box>
                    <div>Código: {data.codeBarras}</div>
                    <div>Venda: R$ {data.salerPrice}</div>
                    <div>Etiqueta: R$ {data.tagPrice}</div>
                </Box>
                <Box sx={{display:"flex", justifyContent:"flex-end"}}><ProductSubMenu product={data} update={update}/></Box>
            </BoxInfos>
        </BoxCard>
    )
}

