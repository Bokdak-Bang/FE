import create from 'zustand';

interface CategoryScore {
  categoryName: string;
  score: number;
}

interface DetailCategory {
  detailCategory: string;
  mean: number;
}

interface DetailBoard {
  bigCategory: string;
  detailCategory: string;
  score: number;
}

interface AreaData {
  area: string;
  areaBoardScoreResponse: CategoryScore[];
  meanScoreResponses: DetailCategory[];
  areaBoardCategoryScoreResponses: {
    categoryName: string;
    areaDetailBoardResponsList: DetailBoard[];
  }[];
}

interface AreaState {
  areaData: AreaData | null;
  setAreaData: (data: AreaData) => void;
}

const useAreaStore = create<AreaState>((set) => ({
  areaData: null,
  setAreaData: (data) => set({ areaData: data }),
}));

export default useAreaStore;
