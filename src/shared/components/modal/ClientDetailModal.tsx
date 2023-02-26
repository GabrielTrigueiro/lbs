import { Divider, Modal, Typography } from "@mui/material"
import { RegisterClient } from "../../models/client"
import styles from "../../../styles/Client/ClientDetail.module.scss"

export const ClientDetail: React.FC<{
  modalState: boolean,
  client: RegisterClient,
  handleModal: () => void,
  update: () => void
}> = ({ modalState, client, handleModal, update }) => {

  return (
    <>
      <Modal className={styles.container} open={modalState} onClose={handleModal}>
        <div className={styles.details}>
          <Typography className={styles.title}>Dados do Cliente</Typography>
          <Divider />
          <div className={styles.info}>
            <div className={styles.infoLeft}>
              <Typography>{client.name}</Typography>
              <Typography>{client.dataNascimento}</Typography>
              <Typography>{client.cpf}</Typography>
              <Typography>{client.rg}</Typography>
            </div>
            <div className={styles.infoRight}>
              <Typography>{client.email}</Typography>
              <Typography>{client.cell}</Typography>
              <Typography>{client.telephone}</Typography>
            </div>
          </div>
          <div className={styles.addres}>
            <div className={styles.addressLeft}>
              <Typography>{client.uf}</Typography>
              <Typography>{client.city}</Typography>
              <Typography>{client.cep}</Typography>
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