import { create } from 'zustand';

// 헤더에서 이름만 보여주면 됨
export type Member = {
  name: string;
  setMember: (name: string) => void;
  getMember: () => string;
};

export const useMemberStore = create<Member>((set, get) => ({
  name: '',

  setMember: (name: string) => set({ name: name }),

  getMember: () => {
    const name = get().name;
    return name;
  },
}));
