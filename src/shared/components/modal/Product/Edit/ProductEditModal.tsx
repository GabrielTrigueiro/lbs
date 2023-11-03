import useDialogEditProduct from 'shared/hooks/dialogs/DialogEditProduct';
import useEditarProduto from 'shared/hooks/produtos/EditarProduto';
import { Container } from '../TableComponents';
import { CardForm } from '../ModalStyles';
import ModalHeader from '../ModalHeader';
import { ProductAbout } from '../ProductAbout';
import GenericDialog from '../../Dialog/Dialog';
import { IDataProduct } from 'shared/models/product';

interface props {
  atualizarPagina: () => void;
  produto: IDataProduct;
}

const ProductEditModal = ({ atualizarPagina, produto }: props) => {
  const { isOpen, onClose } = useEditarProduto();
  const { isOpenDialogEdit, onCloseDialogEdit, onOpenDialogEdit } =
    useDialogEditProduct();

  function cancelEdit() {
    onClose();
    onCloseDialogEdit();
  }

  return (
    <>
      <Container
        BackdropProps={{ hidden: true }}
        sx={{ outline: 'none' }}
        open={isOpen}
        onClose={onOpenDialogEdit}
      >
        <CardForm>
          <ModalHeader
            tittle={'Editar Produto'}
            closeButtonFunction={onOpenDialogEdit}
          />
          <ProductAbout
            produto={produto}
            close={onClose}
            atualizar={atualizarPagina}
          />
        </CardForm>
      </Container>
      <GenericDialog
        isOpenDialog={isOpenDialogEdit}
        onCloseDialog={onCloseDialogEdit}
        title="Cancelar edição?"
        confirmAction={cancelEdit}
      />
    </>
  );
};

export default ProductEditModal;
