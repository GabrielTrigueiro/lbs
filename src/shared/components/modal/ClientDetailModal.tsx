import { Modal } from "@mui/material"
import { RegisterClient } from "../../models/client"

export const ClientDetail: React.FC<{ 
  modalState: boolean,
  client: RegisterClient,
  handleModal: () => void, 
  update: ()=>void
}> = ({modalState, client, handleModal, update}) => {

  return(
    <>
      <Modal open={modalState} onClose={handleModal}>
        <div>
          detalhes do cliente
        </div>
      </Modal>
    </>
  )
}