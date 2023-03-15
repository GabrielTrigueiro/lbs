import { Divider, Modal, Typography } from "@mui/material"
import { RegisterClient } from "../../models/client"
import styles from "../../../styles/Client/ClientDetail.module.scss"

export const ClientDetail: React.FC<{
  modalState: boolean,
  client: RegisterClient,
  handleModal: () => void,
  update: () => void
}> = ({ modalState, client, handleModal, update }) => {

  function formatarData(dataString: string) {
    let data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
        doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return doc;
}

  return (
    <>
      <Modal className={styles.container} open={modalState} onClose={handleModal}>
        <div className={styles.details}>
          <Typography className={styles.title}>Dados do Cliente</Typography>
          <Divider />
          <div className={styles.info}>
            <div className={styles.infoLeft}>
              <Typography>{client.name}</Typography>
              <Typography>{formatarData(client.dataNascimento)}</Typography>
              <Typography>{formatarDocumento(client.cpf)}</Typography>
              <Typography>{client.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4")}</Typography>
            </div>
            <div className={styles.infoRight}>
              <Typography>{client.email}</Typography>
              <Typography>{client.cell.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}</Typography>
              <Typography>{client.telephone?.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}</Typography>
            </div>
          </div>
          <div className={styles.addres}>
            <div className={styles.addressLeft}>
              <Typography>{client.uf}</Typography>
              <Typography>{client.city}</Typography>
              <Typography>{client.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')}</Typography>
            </div>
            <div className={styles.addressRight}>
              <Typography>{client.neighborhood}</Typography>
              <Typography>{client.address}</Typography>
              <Typography>{client.number}</Typography>
            </div>
          </div>
          <Typography className={styles.title}>Histórico de Compras</Typography>
          <Divider />
        </div>
      </Modal>
    </>
  )
}