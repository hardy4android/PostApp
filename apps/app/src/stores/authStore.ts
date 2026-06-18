import { create } from "zustand";

interface IAuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
  logout: () => set({ isAuthenticated: false }),
}));
