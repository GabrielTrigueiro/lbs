import { Modal } from "@mui/material";
import styles from "../../../styles/Product/ProductRegisterModal.module.scss";
import { useFormik } from "formik";
import { ProductValidationSchema } from "../../models/product";

interface props {
    state: boolean;
    handleModal: () => void;
    update: () => void;
}

export const ProductRegisterModal: React.FC<props> = ({ handleModal, state, update }) => {
    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            quantidade: "",
            custePrice: "",
            salerPrice: "",
            tagPrice: "",
            codeBarras: "",
            codeInt: "",
        },
        validationSchema: ProductValidationSchema,
        onSubmit: (values) => {

        },
        onReset(values, formikHelpers) {

        },
    })
    return (
        <>
            <Modal className={styles.modalContainer} open={state} onClose={handleModal}>
                <div className={styles.modalFormContainer}>
                    <div className={styles.titulo}>
                        Cadastrar Produto
                    </div>
                    <form className={styles.form}>
                        <div className={styles.up}>
                            <div>

                            </div>
                        </div>
                        <div className={styles.mid}>
                            2
                        </div>
                        <div className={styles.down}>
                            3
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
