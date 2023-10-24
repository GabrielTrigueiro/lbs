import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ItitleContainerProps {
  pageTitle: string;
  handleMainButton: () => void;
  mainButtonLabel: string;
}

const TitlePageContainer = ({
  handleMainButton,
  mainButtonLabel,
  pageTitle,
}: ItitleContainerProps) => {
  return (
    <Container>
      <Typography fontWeight={'bold'} fontSize={40} color={'#575A61'}>
        {pageTitle}
      </Typography>
      <Button
        onClick={handleMainButton}
        variant="contained"
        startIcon={<Add />}
      >
        <Typography fontWeight={700} fontSize={'12px'}>
          {mainButtonLabel}
        </Typography>
      </Button>
    </Container>
  );
};

export default TitlePageContainer;
