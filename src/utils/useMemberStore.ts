import { create } from 'zustand';

export type Member = {
  name: string;
  email: string;
  password: string;
  setMember: (name: string, email: string, password: string) => void;
  getMember: () => void;
};

export const useMemberStore = create<Member>((set, get) => ({
  name: '',
  email: '',
  password: '',

  setMember: (name: string, email: string, password: string) =>
    set({ name: name, email: email, password: password }),

  getMember: () => {
    const name = get().name;
    const email = get().email;
    const password = get().password;
    return { name, email, password };
  },
}));
