import { Alert, AlertTitle } from "@mui/material";

interface ISuccessAlert {
  mensagem: string;
}

export const SuccessAlert: React.FC<ISuccessAlert> = ({ mensagem }) => {
  return (
    <Alert severity="success">
      <AlertTitle>Concluído</AlertTitle>
      {mensagem}
    </Alert>
  );
};
