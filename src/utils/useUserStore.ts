import { create } from 'zustand';

export type User = {
  userName: string;
  userEmail: string;
  userPassword: string;
  setUser: (name: string, email: string, password: string) => void;
  getUser: () => void;
};

export const useUserStore = create<User>((set, get) => ({
  userName: '',
  userEmail: '',
  userPassword: '',

  setUser: (name: string, email: string, password: string) =>
    set({ userName: name, userEmail: email, userPassword: password }),

  getUser: () => {
    const name = get().userName;
    const email = get().userEmail;
    const password = get().userPassword;
    return { name, email, password };
  },
}));
