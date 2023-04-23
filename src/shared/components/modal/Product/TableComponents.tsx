import {styled} from "@mui/material/styles";
import {Box, Modal, Typography} from "@mui/material";

export const Container = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})

export const Card = styled(Box)({
  outline: "none",
  backgroundColor: "#FFF",
  height: "85vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
})

export const Title = styled(Typography)({
  color: "white",
  backgroundColor: "#494b4f",
  fontWeight: "bold",
  fontSize: "24px",
  padding: "0.5em 1.4em"
})

export const FormBody = styled("form")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "1em"
})

export const TableStyle = styled(Box)({
  maxHeight:"10em",
  margin:"0 auto",
  overflowY: "scroll",
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