import { Box, Modal, Typography } from "@mui/material";
import { borderColor } from "@mui/system";
import React, { useState } from "react";
import { IInfoProvider } from "../../services/api/providers/ProviderService";
import { SearchInput } from "../search";

interface props {
  close: () => void;
  state: boolean;
  tittle: string;
  thisProvider: IInfoProvider;
}

export const ProviderDetail: React.FC<props> = ({ close, state, tittle, thisProvider: thisProvider }) => {

    const [searchValue, setSearchValue] = useState<string>("");
    let fontSizeContainerDados = 16

  return (
    <Modal
      open={state}
      onClose={close}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#EFEFEF",
          width: 800,
          height: 600,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          padding: 4,
        }}
      >
        {/* container de Título */}
        <Box
          sx={{
            width: "100%",
            borderBottom: "solid",
            borderColor: "#D9D9D9",
          }}
        >
          <Typography
            color={"#575A61"}
            fontSize={"20px"}
            fontWeight={"600"}
          >
            {tittle}
          </Typography>
        </Box>
        {/* container de dados  */}
        <Box color={'#555555'}>
          <Box
            mt={1}
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.name}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.cnpj}</Typography>
            </Box>
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.email}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.telephone}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.cell}</Typography>
            </Box>
          </Box>
          <Box
            mt={2}
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.uf}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.city}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.cep}</Typography>
            </Box>
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.neighborhood}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.address}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisProvider.number}</Typography>
            </Box>
          </Box>
        </Box>
        
        {/* container de titulo da tabela e search */}
        <Box
          sx={{
            width: "100%",
            borderBottom: "solid",
            borderColor: "#D9D9D9",
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
          }}
        >
          <Typography
            color={"#575A61"}
            fontSize={"20px"}
            fontWeight={"600"}
            mt={4}
          >
            Histórico de Compra
          </Typography>
          <Box 
          position={"relative"}
          bottom={-19}
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <SearchInput change={(value)=>{setSearchValue(value.target.value)}}/>
          </Box>
        </Box>
        {/* container da table */}
        <Box
          mt={1}
          sx={{
            bgcolor:'#999',
            width: "100%",
            height: "100%",
          }}
        >
          3
        </Box>
      </Box>
    </Modal>
  );
};
