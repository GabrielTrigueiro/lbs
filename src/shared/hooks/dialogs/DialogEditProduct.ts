import { create } from 'zustand';

interface DialogEditConfirmation {
  isOpenDialogEdit: boolean;
  onOpenDialogEdit: () => void;
  onCloseDialogEdit: () => void;
}

const useDialogEditProduct = create<DialogEditConfirmation>((set) => ({
  isOpenDialogEdit: false,
  onOpenDialogEdit: () => set({ isOpenDialogEdit: true }),
  onCloseDialogEdit: () => set({ isOpenDialogEdit: false }),
}));

export default useDialogEditProduct;
