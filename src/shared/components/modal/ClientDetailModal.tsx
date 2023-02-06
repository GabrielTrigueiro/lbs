import { Box, Modal, Typography } from "@mui/material";
import { borderColor } from "@mui/system";
import React, { useState } from "react";
import { IInfoClient } from "../../models/client"; 
import { IInfoProvider } from "../../services/api/providers/ProviderService";
import { SearchInput } from "../search";

interface props {
  close: () => void;
  state: boolean;
  tittle: string;
  thisClient: IInfoClient;
}

export const ClientDetail: React.FC<props> = ({ close, state, tittle, thisClient }) => {

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
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.name}</Typography>
                {/* <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.sex}</Typography> */}
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.rg}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.cpf}</Typography>
            </Box>
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.email}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.telephone}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.cell}</Typography>
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
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.uf}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.city}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.cep}</Typography>
            </Box>
            <Box flex={1}>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.neighborhood}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.address}</Typography>
                <Typography fontSize={`${fontSizeContainerDados}px`}>{thisClient.number}</Typography>
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
