import React from 'react';
import {
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import modal from '../../../../styles/Client/ClientRegister.module.scss';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import { Notification } from '../../notification';
import { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RegisterClient, clientValidationSchema } from '../../../models/client';
import { IndicationService } from '../../../services/api/indication/IndicationService';
import { dataOneIndication } from '../../../models/indication';
import { ClienteService } from '../../../services';
import FormikTextField from '../../formik-text-field/FormikTextField';
import { useParams } from 'react-router';

export const ClientEditModal: React.FC<{
  modalState: boolean;
  handleModal: () => void;
  client: RegisterClient;
  update: () => void;
}> = ({ modalState, handleModal, client, update }) => {
  const params = useParams();
  const [confirm, setConfirm] = useState<true | false>(false);
  const [indicState, setindicState] = useState(false);
  const [select, setSelect] = useState('');
  const [tempInd, setTempInd] = useState<dataOneIndication>({
    description: '',
    id: '',
    type: '',
  });
  const [clientInd, setClientInd] = useState<dataOneIndication[]>([
    { description: '', id: '', type: '' },
  ]);
  const [apiInd, setApiInd] = useState<dataOneIndication[]>([
    { description: '', id: '', type: '' },
  ]);

  function addObject(object: dataOneIndication) {
    const existingObject = clientInd.find((obj) => obj.id === object.id);

    if (!existingObject) {
      setClientInd([...clientInd, object]);
      setSelect('');
      return;
    } else {
      Notification('Essa indicação já está em sua lista', 'error');
      setSelect('');
      return;
    }
  }

  function removeInd(id: string) {
    let idRemovedArray = clientInd.filter((obj) => obj.id !== id);
    setClientInd(idRemovedArray);
  }

  function addInd() {
    if (clientInd.length === 3) {
      Notification('Só podem haver três indicações', 'error');
      setSelect('');
      return;
    }
    addObject(tempInd);
  }

  function changeConfirm() {
    setConfirm(!confirm);
  }

  function closeModal() {
    handleModal();
    changeConfirm();
    formik.resetForm();
  }

  function getCepData(ev: any) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.localidade) {
          formik.setFieldValue('city', `${data.localidade}`);
          formik.setFieldValue('uf', `${data.uf}`);
          formik.setFieldValue('address', `${data.logradouro}`);
          formik.setFieldValue('neighborhood', `${data.bairro}`);
        }
      });
  }

  function handleChange(event: SelectChangeEvent) {
    setSelect(event.target.value as string);
  }

  function editUser(objeto: RegisterClient) {
    if (objeto.id) {
      ClienteService.UpdateById(objeto.id, objeto).then((response) => {
        Notification('Editado com sucesso', 'success');
        update();
        handleModal();
      });
    }
  }

  function formatarDocumento(doc: string) {
    // remove todos os caracteres não numéricos
    doc = doc.replace(/\D/g, '');

    // verifica o tipo de documento (CPF ou CNPJ)
    if (doc.length === 11) {
      // formata CPF: 999.999.999-99
      doc = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (doc.length === 14) {
      // formata CNPJ: 99.999.999/9999-99
      doc = doc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
    return doc;
  }

  const formik = useFormik({
    initialValues: {
      id: client.id,
      address: client.address,
      cell: client.cell,
      cep: client.cep,
      city: client.city,
      cpf: client.cpf,
      email: client.email,
      name: client.name,
      neighborhood: client.neighborhood,
      number: client.number,
      rg: client.rg,
      telephone: client.telephone,
      uf: client.uf,
      dataNascimento: client.dataNascimento,
      indicacoesIds: client.indicacoesIds,
    },
    validationSchema: clientValidationSchema,
    onSubmit: (values) => {
      formik.values.indicacoesIds = clientInd.map((item) => item.id);
      editUser(values);
    },
    onReset(values, formikHelpers) {},
  });

  useEffect(() => {
    if (String(params) === 'clientes') {
      if (client.id) {
        ClienteService.getByIDd(client.id).then((response) => {
          setClientInd(response.data.indicacoes);
        });
      }
      IndicationService.getInficacoes().then((response) => {
        setApiInd(response.data.data);
      });
    }
  }, [client.id, params]);

  return (
    <>
      <Modal
        className={modal.modalContainer}
        open={modalState}
        onClose={changeConfirm}
      >
        <div className={modal.modalFormContainer}>
          <div className={modal.titulo}>Editar Cliente</div>
          <div className={modal.form}>
            <form className={modal.innerForm} onSubmit={formik.handleSubmit}>
              <div className={modal.up}>
                <div className={modal.upLeft}>
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="name"
                    name="name"
                    label="Nome completo"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="rg"
                    name="rg"
                    label="RG"
                    inputProps={{ maxLength: '9' }}
                    value={formik.values.rg.replace(
                      /(\d{2})(\d{3})(\d{3})(\d{1})/,
                      '$1.$2.$3-$4'
                    )}
                    onChange={formik.handleChange}
                    error={formik.touched.rg && Boolean(formik.errors.rg)}
                    helperText={formik.touched.rg && formik.errors.rg}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="cpf"
                    name="cpf"
                    label="CPF/CNPJ "
                    inputProps={{ maxLength: '15' }}
                    value={formatarDocumento(formik.values.cpf)}
                    onChange={formik.handleChange}
                    error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                    helperText={formik.touched.cpf && formik.errors.cpf}
                  />
                  <DatePicker
                    label="Data de nascimento"
                    disableFuture
                    value={formik.values.dataNascimento}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        autoComplete="none"
                        error={
                          formik.touched.dataNascimento &&
                          Boolean(formik.errors.dataNascimento)
                        }
                        helperText={
                          formik.touched.dataNascimento &&
                          formik.errors.dataNascimento
                        }
                      />
                    )}
                    onChange={(value) =>
                      formik.setFieldValue('dataNascimento', value, true)
                    }
                  />
                </div>
                <div className={modal.upRight}>
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="telephone"
                    name="telephone"
                    label="Telefone"
                    inputProps={{ maxLength: '10' }}
                    value={formik.values.telephone?.replace(
                      /(\d{2})(\d{4})(\d{4})/,
                      '($1) $2-$3'
                    )}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.telephone &&
                      Boolean(formik.errors.telephone)
                    }
                    helperText={
                      formik.touched.telephone && formik.errors.telephone
                    }
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="cell"
                    name="cell"
                    label="Celular"
                    inputProps={{ maxLength: '10' }}
                    value={formik.values.cell.replace(
                      /(\d{2})(\d{4})(\d{4})/,
                      '($1) $2-$3'
                    )}
                    onChange={formik.handleChange}
                    error={formik.touched.cell && Boolean(formik.errors.cell)}
                    helperText={formik.touched.cell && formik.errors.cell}
                  />
                  {/* indicações do cliente */}
                  <Stack
                    direction="row"
                    spacing={1}
                    className={modal.indicacoes}
                  >
                    <Button
                      onClick={() => setindicState(true)}
                      className={modal.indicaceosButton}
                      variant="contained"
                    >
                      + Indicações
                    </Button>
                    {clientInd.map((item, index) => (
                      <Chip
                        sx={{ fontSize: 9 }}
                        size="small"
                        key={item.id}
                        variant="filled"
                        label={item.type}
                        onDelete={() => removeInd(item.id)}
                      />
                    ))}
                  </Stack>
                </div>
              </div>
              <div className={modal.subtitulo}>Informações de endereço</div>
              <div className={modal.down}>
                <div className={modal.downLeft}>
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="uf"
                    name="uf"
                    label="UF"
                    value={formik.values.uf}
                    onChange={formik.handleChange}
                    error={formik.touched.uf && Boolean(formik.errors.uf)}
                    helperText={formik.touched.uf && formik.errors.uf}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="address"
                    name="address"
                    label="Endereço"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="cep"
                    name="cep"
                    label="CEP"
                    inputProps={{ maxLength: '8' }}
                    value={formik.values.cep.replace(
                      /^(\d{5})(\d{3})$/,
                      '$1-$2'
                    )}
                    onBlur={getCepData}
                    onChange={formik.handleChange}
                    error={formik.touched.cep && Boolean(formik.errors.cep)}
                    helperText={formik.touched.cep && formik.errors.cep}
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="city"
                    name="city"
                    label="Cidade"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </div>
                <div className={modal.downRight}>
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="neighborhood"
                    name="neighborhood"
                    label="Bairro"
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.neighborhood &&
                      Boolean(formik.errors.neighborhood)
                    }
                    helperText={
                      formik.touched.neighborhood && formik.errors.neighborhood
                    }
                  />
                  <FormikTextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="number"
                    name="number"
                    label="Número da residência"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.number && Boolean(formik.errors.number)
                    }
                    helperText={formik.touched.number && formik.errors.number}
                  />
                </div>
              </div>
              <div className={modal.submit}>
                <Button
                  type="reset"
                  onClick={changeConfirm}
                  className={modal.button}
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={modal.button}
                  variant="contained"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Dialog open={confirm}>
        <DialogTitle className={modal.confirmTitle}>
          Não aplicar alterações?
        </DialogTitle>
        <DialogActions>
          <Button className={modal.button} onClick={changeConfirm}>
            Cancelar
          </Button>
          <Button className={modal.button} onClick={closeModal}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        className={modal.modalContainer}
        open={indicState}
        onClose={() => setindicState(false)}
      >
        <div className={modal.indicacaoContainer}>
          <div className={modal.indicacaoTitle}>Cadastrar Indicação</div>
          <div className={modal.optionContainer}>
            <FormControl className={modal.formIndic} variant="standard">
              <InputLabel>Indicação</InputLabel>

              <Select value={select} onChange={handleChange}>
                {apiInd.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => setTempInd(item)}
                    value={item.type}
                  >
                    {item.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={modal.indicacoesActions}>
              <Button
                className={modal.button}
                onClick={() => setindicState(false)}
              >
                Cancelar
              </Button>
              <Button className={modal.button} onClick={addInd}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
