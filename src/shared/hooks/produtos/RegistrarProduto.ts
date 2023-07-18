import { create } from 'zustand';

interface RegistrarProduto {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegistrarProduto = create<RegistrarProduto>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegistrarProduto;
