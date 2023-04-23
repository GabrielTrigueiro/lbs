import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const CaixaPage = () => {

  return(
    <Box
      sx={{
        width:"100%",
        padding:"3em 0",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"1em"
      }}
    >
      <Box sx={{display:"grid", gridTemplateRows:"5em 1fr", rowGap:"1em"}}>
        <Box  sx={{background:"#fff"}}>oi</Box>
        <Box  sx={{background:"#fff"}}>io</Box>
      </Box>
      <Box sx={{
          display:"grid",
          gap:"1em",
          gridTemplateRows:"1fr 100px 1fr 100px"
        }}
      >
        <Box sx={{background:"#fff"}}>1</Box>
        <Box sx={{background:"#fff"}}>2</Box>
        <Box sx={{background:"#fff"}}>3</Box>
        <Box sx={{background:"#fff"}}>4</Box>
      </Box>
    </Box>
  )
}