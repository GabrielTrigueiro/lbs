import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import styles from '../../../../styles/Product/ProductRegisterInfoTable.module.scss';
import { useState } from 'react';
import { oneInformation } from '../../../models/product';
// import { TableSubMenu } from '../../client-submenu/TableSubMenu';
import { Notification } from '../../notification';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { TableStyle, Title } from './TableComponents';
import { TableContainer, TableHead, TableBody } from '@mui/material';

interface props {
  removerPorId: (newArray: oneInformation[]) => void;
  qtd: number;
  state: boolean;
  infosAr?: oneInformation[];
  onFormSubmit: (formValues: oneInformation) => void;
  changeState: () => void;
}

export const ProductRegisterInfos: React.FC<props> = ({
  changeState,
  state,
  qtd,
  onFormSubmit,
  infosAr,
  removerPorId,
}) => {
  const [confirm, setConfirm] = useState<true | false>(false);

  function handleConfirm() {
    setConfirm(!confirm);
  }

  function changeConfirmAndModal() {
    setConfirm(!confirm);
    changeState();
  }

  const [formValues, setFormValues] = useState<oneInformation>({
    color: '',
    size: '',
    quantity: 0,
  });

  function handleCorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, color: event.target.value });
  }

  function handleTamanhoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, size: event.target.value });
  }

  function handleQuantidadeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, quantity: Number(event.target.value) });
  }

  function handlebutton() {
    if (formValues.color == '' && formValues.size == '') {
      Notification('Preencha ao menos um campo de informação', 'error');
      return;
    }
    if (formValues.quantity < 0) {
      Notification('Quantidade inválida', 'error');
      return;
    } else {
      onFormSubmit(formValues);
      setFormValues({ color: '', size: '', quantity: 0 });
    }
  }

  function handleButtonClick() {
    changeState();
  }

  function remover(obj: number) {
    if (infosAr) {
      let newArray = infosAr.filter((e, index) => index !== obj);
      removerPorId(newArray);
    }
  }

  return (
    <>
      <Modal open={state} onClose={handleConfirm}>
        <Box sx={{ backgroundColor: '#fff' }}>
          <Title align={'center'}>TAMANHOS</Title>
          <div className={styles.form}>
            <div className={styles.inputs}>
              <TextField
                label="Cor"
                value={formValues.color}
                onChange={handleCorChange}
                variant={'standard'}
              />
              <TextField
                label="Tamanho"
                value={formValues.size}
                onChange={handleTamanhoChange}
                variant={'standard'}
              />
              <TextField
                type="number"
                inputProps={{
                  inputprops: { min: 0 },
                }}
                label="Quantidade"
                value={formValues.quantity}
                onChange={handleQuantidadeChange}
                variant={'standard'}
              />
              <Button onClick={handlebutton} className={styles.button}>
                Adicionar
              </Button>
            </div>
            <TableStyle sx={{ width: '100%' }}>
              <TableContainer>
                <Table>
                  <TableHead className={styles.tableHead}>
                    <TableRow>
                      <TableCell>Cor</TableCell>
                      <TableCell>Tamanho</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {infosAr ? (
                      infosAr.map((row, index) => (
                        <TableRow
                          sx={{
                            'td:first-child': {
                              borderLeftColor: 'transparent',
                            },
                          }}
                          key={index}
                        >
                          <TableCell>{row.color}</TableCell>
                          <TableCell>{row.size}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>
                            <DoDisturbOnIcon
                              onClick={() => remover(index)}
                              sx={{
                                margin: 'auto 0',
                                ':hover': { color: '#666' },
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableStyle>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ margin: 'auto 0' }}>
                Qtd. Total: {qtd}
              </Typography>
              <Button
                sx={{ margin: '1em' }}
                variant={'contained'}
                onClick={handleConfirm}
              >
                Fechar
              </Button>
              <Button
                sx={{ margin: '1em' }}
                variant={'contained'}
                onClick={handleButtonClick}
              >
                Salvar
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>

      <Dialog open={confirm}>
        <DialogTitle className={styles.confirmTitle}>
          Não aplicar alterações?
        </DialogTitle>
        <DialogActions>
          <Button className={styles.button} onClick={handleConfirm}>
            Cancelar
          </Button>
          <Button className={styles.button} onClick={changeConfirmAndModal}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
