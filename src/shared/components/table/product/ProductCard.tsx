import styled from "@emotion/styled";
import {IDataProduct, oneInformation} from "../../../models/product";
import {Box, Typography} from "@mui/material";
import {ProductSubMenu} from "../../product-submenu/ProductSubMenu";

const BoxCard = styled(Box)({
    backgroundColor:"#fff",
    height:"14em",
    width:"11em",
    borderRadius:"1em",
    padding: "0.5em",
    fontFamily:"Poppins !important"
})

const BoxImagem = styled(Box)({
    backgroundColor:"#3f3f3f",
    height:"50%",
    width:"100%",
    borderRadius:"0.5em",
})

const BoxName = styled.div({
    textAlign:"center",
    marginTop:"0.5em"
})

const BoxInfos = styled(Box)({
    marginTop:"1em",
    display:"flex",
    flexDirection:"row",
    fontSize:"0.8pc",
    alignItems:"center",
    justifyContent:"space-between"
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
                    <div>Código: {data.codeInt}</div>
                    <div>Venda: R$ {data.salerPrice}</div>
                    <div>Etiqueta: R$ {data.tagPrice}</div>
                </Box>
                <Box sx={{display:"flex", justifyContent:"flex-end"}}><ProductSubMenu product={data} update={update}/></Box>
            </BoxInfos>
        </BoxCard>
    )
}