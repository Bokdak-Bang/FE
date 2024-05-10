import { create } from 'zustand';

export type Member = {
  role: string;
  name: string;
  email: string;
  password: string;
  region: string;
  estateName: string;
  callNumber: string;
  address: string;
  setMember: (
    role: string,
    name: string,
    email: string,
    password: string,
  ) => void;
  setAgent: (
    role: string,
    name: string,
    email: string,
    password: string,
    region: string,
    estateName: string,
    callNumber: string,
    address: string,
  ) => void;
  getMember: () => {
    role: string;
    name: string;
    email: string;
    password: string;
  };
  getAgent: () => {
    role: string;
    name: string;
    email: string;
    password: string;
    region: string;
    estateName: string;
    callNumber: string;
    address: string;
  };
};

export const useMemberStore = create<Member>((set, get) => ({
  role: '',
  name: '',
  email: '',
  password: '',
  region: '',
  estateName: '',
  callNumber: '',
  address: '',

  setMember: (role: string, name: string, email: string, password: string) => {
    set({ role: role, name: name, email: email, password: password });
    console.log(role, name, email, password);
  },
  setAgent: (
    role,
    name,
    email,
    password,
    region,
    estateName,
    callNumber,
    address,
  ) =>
    set({
      role: role,
      name: name,
      email: email,
      password: password,
      region: region,
      estateName: estateName,
      callNumber: callNumber,
      address: address,
    }),

  getMember: () => {
    const role = get().role;
    const name = get().name;
    const email = get().email;
    const password = get().password;
    return { role, name, email, password };
  },

  getAgent: () => {
    const role = get().role;
    const name = get().name;
    const email = get().email;
    const password = get().password;
    const region = get().region;
    const estateName = get().estateName;
    const callNumber = get().callNumber;
    const address = get().address;
    return {
      role,
      name,
      email,
      password,
      region,
      estateName,
      callNumber,
      address,
    };
  },
}));
