import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": { width: "20ch"},
    },
  },
}));

export const SearchInput: React.FC<{change: (text:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}> = ({change}) => {

  const [ word, setWord ] = useState<string>('')

  return (
    <Box sx={{ flexGrow: 1}}>
      <Search> 
        <SearchIconWrapper>
          <SearchIcon sx={{color:'#575A61'}} />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={
            value => {
              change(value);
              setWord(value.target.value);
            }
          }
          placeholder="Pesquisar…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
}
