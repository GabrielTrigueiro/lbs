import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
} from '@mui/material';
import styles from '../../../../styles/Provider/ProviderRegister.module.scss';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { ProviderCadastroSchema } from '../../../models/provider';
import { useState } from 'react';
import { IProviderCadastroInfo } from '../../../models/provider';
import { ProviderService } from '../../../services/api/providers/ProviderService';
import { Notification } from '../../notification';

export const ProviderRegisterModal: React.FC<{
  modalState: boolean;
  handleModal: () => void;
  update: () => void;
}> = ({ handleModal, modalState, update }) => {
  const formik = useFormik({
    initialValues: {
      address: '',
      cell: '',
      cep: '',
      city: '',
      cityId: '',
      cnpj: '',
      code: '',
      contact: '',
      email: '',
      name: '',
      neighborhood: '',
      number: '',
      telephone: '',
      uf: '',
      stateRegistration: '',
      nameContact: '',
    },
    validationSchema: ProviderCadastroSchema,
    onSubmit: (values) => {
      createProvider(values);
    },
    onReset(values, formikHelpers) {},
  });

  const [confirm, setConfirm] = useState<true | false>(false);

  function createProvider(newProvider: IProviderCadastroInfo) {
    ProviderService.Create(newProvider).then((response) => {
      Notification(response.message, 'success');
      update();
      handleModal();
      formik.resetForm();
    });
  }

  function changeConfirm() {
    setConfirm(!confirm);
  }

  function closeModal() {
    formik.resetForm();
    handleModal();
    changeConfirm();
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

  function formatarDocumento(doc: string) {
    doc = doc.replace(/\D/g, '');
    doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return doc;
  }

  return (
    <>
      <Modal
        className={styles.container}
        open={modalState}
        onClose={changeConfirm}
      >
        <div className={styles.formContainer}>
          <div className={styles.titulo}>Cadastrar Fornecedor</div>
          <div className={styles.form}>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.up}>
                <div className={styles.upLeft}>
                  <TextField
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
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="nameContact"
                    name="nameContact"
                    label="Nome do representante"
                    value={formik.values.nameContact}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nameContact &&
                      Boolean(formik.errors.nameContact)
                    }
                    helperText={
                      formik.touched.nameContact && formik.errors.nameContact
                    }
                  />
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="stateRegistration"
                    name="stateRegistration"
                    label="Inscrição estadual"
                    value={formik.values.stateRegistration}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.stateRegistration &&
                      Boolean(formik.errors.stateRegistration)
                    }
                    helperText={
                      formik.touched.stateRegistration &&
                      formik.errors.stateRegistration
                    }
                  />
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="cnpj"
                    name="cnpj"
                    label="CNPJ"
                    value={formatarDocumento(formik.values.cnpj)}
                    inputProps={{ maxLength: '15' }}
                    onChange={formik.handleChange}
                    error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                    helperText={formik.touched.cnpj && formik.errors.cnpj}
                  />
                </div>
                <div className={styles.upRight}>
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="code"
                    name="code"
                    label="Código"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                  />
                  <TextField
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
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="telephone"
                    name="telephone"
                    label="Telefone"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.telephone &&
                      Boolean(formik.errors.telephone)
                    }
                    helperText={
                      formik.touched.telephone && formik.errors.telephone
                    }
                  />
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="contact"
                    name="contact"
                    label="Celular"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.contact && Boolean(formik.errors.contact)
                    }
                    helperText={formik.touched.contact && formik.errors.contact}
                  />
                </div>
              </div>
              <div className={styles.subtitulo}>Informações de endereço</div>
              <div className={styles.down}>
                <div className={styles.downLeft}>
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    size="small"
                    fullWidth
                    id="cep"
                    name="cep"
                    label="CEP"
                    value={formik.values.cep}
                    onBlur={getCepData}
                    onChange={formik.handleChange}
                    error={formik.touched.cep && Boolean(formik.errors.cep)}
                    helperText={formik.touched.cep && formik.errors.cep}
                  />
                  <TextField
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
                  <TextField
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
                  <TextField
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
                <div className={styles.downRight}>
                  <TextField
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
                  <TextField
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
              <div className={styles.submit}>
                <Button
                  type="reset"
                  onClick={changeConfirm}
                  className={styles.button}
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={styles.button}
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
        <DialogTitle className={styles.confirmTitle}>
          Não aplicar alterações?
        </DialogTitle>
        <DialogActions>
          <Button className={styles.button} onClick={changeConfirm}>
            Cancelar
          </Button>
          <Button className={styles.button} onClick={closeModal}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
