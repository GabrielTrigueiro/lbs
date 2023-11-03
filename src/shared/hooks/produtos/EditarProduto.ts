import { create } from 'zustand';

interface EditarProduto {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditarProduto = create<EditarProduto>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditarProduto;
