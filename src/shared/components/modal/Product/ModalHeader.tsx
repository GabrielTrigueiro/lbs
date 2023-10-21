import { Box, Button, Typography } from '@mui/material';
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
    <Box sx={{ marginBottom: 1 }}>
      <Button
        onClick={closeButtonFunction}
        sx={{ position: 'absolute', right: 15, top: 15 }}
        variant="contained"
      >
        <CloseIcon />
      </Button>
      <Typography
        sx={{ fontWeight: 'bold', fontSize: '1.8rem', textAlign: 'center' }}
      >
        {tittle}
      </Typography>
    </Box>
  );
}
