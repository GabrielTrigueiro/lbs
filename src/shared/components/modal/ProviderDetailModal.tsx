import { Divider, Modal, Typography, Button } from "@mui/material"
import styles from "../../../styles/Provider/ProviderDetail.module.scss"
import { IProviderCadastroInfo } from "../../models/provider"
import CloseIcon from '@mui/icons-material/Close';

export const ProviderDetailModal: React.FC<{
    modalState: boolean,
    handleModal: () => void,
    fornecedor: IProviderCadastroInfo,
}> = ({ modalState, handleModal, fornecedor }) => {

    return (
        <>
            <Modal className={styles.container} open={modalState} onClose={handleModal}>
                <div className={styles.details}>
                    <div className={styles.titleContainer}>
                        <Typography className={styles.title}>Dados do Fornecedor</Typography><Button sx={{":hover":{background:"#D9D9D9"}}} onClick={handleModal}><CloseIcon sx={{color: "#494b4f"}}/></Button>
                    </div>
                    <Divider />
                    <div className={styles.info}>
                        <div className={styles.infoLeft}>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Nome</Typography>
                                <Typography className={styles.infoData}>{fornecedor.name}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Representante</Typography>
                                <Typography className={styles.infoData}>{fornecedor.nameContact}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>CNPJ</Typography>
                                <Typography className={styles.infoData}>{fornecedor.cnpj}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Código</Typography>
                                <Typography className={styles.infoData}>{fornecedor.code}</Typography>
                            </div>
                        </div>
                        <div className={styles.infoRight}>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Email</Typography>
                                <Typography className={styles.infoData}>{fornecedor.email}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Celular</Typography>
                                <Typography className={styles.infoData}>{fornecedor.cell}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Telefone Fixo</Typography>
                                <Typography className={styles.infoData}>{fornecedor.telephone}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addres}>
                        <div className={styles.addressLeft}>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>UF</Typography>
                                <Typography className={styles.infoData}>{fornecedor.uf}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Cidade</Typography>
                                <Typography className={styles.infoData}>{fornecedor.city}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>CEP</Typography>
                                <Typography className={styles.infoData}>{fornecedor.cep}</Typography>
                            </div>



                        </div>
                        <div className={styles.addressRight}>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Bairro</Typography>
                                <Typography className={styles.infoData}>{fornecedor.neighborhood}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Endereço</Typography>
                                <Typography className={styles.infoData}>{fornecedor.address}</Typography>
                            </div>
                            <div className={styles.infoDiv}>
                                <Typography className={styles.infoTitle}>Número</Typography>
                                <Typography className={styles.infoData}>{fornecedor.number}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}