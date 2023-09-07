import {
  Modal,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import styles from '../../../../styles/Provider/ProviderDetail.module.scss';
import { IProviderCadastroInfo } from '../../../models/provider';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  outline: none;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled(Typography)`
  font-weight: bold;
`;

const CloseButton = styled(Button)`
  min-width: 0;
`;

const ModalBody = styled(Card)`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

export const ProviderDetailModal: React.FC<{
  modalState: boolean;
  handleModal: () => void;
  fornecedor: IProviderCadastroInfo;
}> = ({ modalState, handleModal, fornecedor }) => {
  return (
    <StyledModal
      className={styles.container}
      open={modalState}
      onClose={handleModal}
    >
      <ModalContainer>
        <ModalHeader>
          <ModalTitle variant="h6">Detalhes do Fornecedor</ModalTitle>
          <CloseButton onClick={handleModal}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <CardContent>
            <Typography variant="h6">Dados gerais:</Typography>
            <Typography variant="body2">Nome: {fornecedor.name}</Typography>
            <Typography variant="body2">
              Endereço: {fornecedor.address}
            </Typography>
            <Typography variant="body2">Telefone: {fornecedor.cell}</Typography>
            <Typography variant="body2">E-mail: {fornecedor.email}</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="h6">Endereço:</Typography>
            <Typography variant="body2">CEP: {fornecedor.cep}</Typography>
            <Typography variant="body2">Rua: {fornecedor.address}</Typography>
            <Typography variant="body2">Cidade: {fornecedor.city}</Typography>
            <Typography variant="body2">Estado: {fornecedor.uf}</Typography>
            <Typography variant="body2">Número: {fornecedor.number}</Typography>
            <Typography variant="body2">
              Bairro: {fornecedor.neighborhood}
            </Typography>
          </CardContent>
        </ModalBody>
      </ModalContainer>
    </StyledModal>
  );
};
