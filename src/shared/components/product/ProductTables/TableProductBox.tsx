import {ProductCard} from "./ProductCard";
import styled from "@emotion/styled";
import {IDataProduct} from "../../../models/product";
import {Box} from "@mui/material";

const BoxTable = styled(Box)({
  height: "100%",
  maxWidth: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  display: "grid",
  padding: "1em",
  gridTemplateColumns: "repeat(auto-fit, minmax(25%, 1fr))",
  "::-webkit-scrollbar": {
    width: "15px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent"
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#d6dee1",
    borderRadius: "20px",
    border: "6px solid transparent",
    backgroundClip: "content-box",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#a8bbbf"
  },
})

interface props {
  lista: IDataProduct[];
  update: () => void;
}

export const TableProductBox: React.FC<props> = ({update, lista}) => {
  return (
    <BoxTable>
      {lista.map((row, index) => (
        <ProductCard key={index} data={row} update={update}/>
      ))}
    </BoxTable>
  )
}