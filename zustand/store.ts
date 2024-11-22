import {create} from 'zustand';

interface StoreState {
    status: boolean;
    toggleLoginModalTrue: () => void;
    toggleLoginModalFalse: () => void;
    toggleLoginModal: () => void;
  }

const useStore = create<StoreState>((set) => ({
  status: false,
  toggleLoginModalTrue: () => set((state) => ({ status: true })), // Return the updated state
  toggleLoginModalFalse: () => set((state) => ({ status: false })), // Return the updated state
  toggleLoginModal: () => set((state) => ({ status: !state.status })), // Return the updated state
}));

export default useStore;