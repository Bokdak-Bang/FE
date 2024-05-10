// src/stores/useStore.js
import create from 'zustand';

interface AreaScore {
  id: number;
  region: string;
  score: number;
}

interface StoreState {
  areaScores: AreaScore[];
  setAreaScores: (scores: AreaScore[]) => void;
}

const useStore = create<StoreState>((set) => ({
  areaScores: [],
  setAreaScores: (scores) => set({ areaScores: scores }),
}));

export default useStore;
