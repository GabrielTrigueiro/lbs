import { create } from 'zustand';

interface DialogConfirmation {
  isOpenDialog: boolean;
  onOpenDialog: () => void;
  onCloseDialog: () => void;
}

const useDialogProduct = create<DialogConfirmation>((set) => ({
  isOpenDialog: false,
  onOpenDialog: () => set({ isOpenDialog: true }),
  onCloseDialog: () => set({ isOpenDialog: false }),
}));

export default useDialogProduct;