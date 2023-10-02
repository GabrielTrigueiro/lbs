import { Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { title } from 'process';

interface IHeaderProps {
  closeButtonFunction: () => void;
  tittle: String;
}

export default function ModalHeader({
  closeButtonFunction,
  tittle,
}: IHeaderProps) {
  return (
    <>
      <Button
        onClick={closeButtonFunction}
        sx={{ position: 'absolute', right: 5, top: 5 }}
        variant="contained"
      >
        <CloseIcon />
      </Button>
      <Typography sx={{ fontWeight: 'bold', fontSize: 21 }}>
        {tittle}
      </Typography>
    </>
  );
}
