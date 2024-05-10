/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './Rank.module.scss';
import { RightArrow } from 'assets';
import { getAreaBoards } from 'apis/DataBoardsApi';
import useAreaStore from 'context/useDetailStroe';

interface RankProps {
  rank: number;
  location: string;
  expandSideBar: () => void;
  onSelectArea: (area: string) => void;
  setAreaRank: (area: string, rank: number) => void;
}

const Rank = ({
  expandSideBar,
  rank,
  location,
  onSelectArea,
  setAreaRank,
}: RankProps) => {
  // const { areaData } = useAreaStore();
  const regionIds: { [key: string]: number } = {
    강남구: 1,
    강동구: 2,
    강북구: 3,
    강서구: 4,
    관악구: 5,
    광진구: 6,
    구로구: 7,
    금천구: 8,
    노원구: 9,
    도봉구: 10,
    동대문구: 11,
    동작구: 12,
    마포구: 13,
    서대문구: 14,
    서초구: 15,
    성동구: 16,
    성북구: 17,
    송파구: 18,
    양천구: 19,
    영등포구: 20,
    용산구: 21,
    은평구: 22,
    종로구: 23,
    중구: 24,
    중랑구: 25,
  };

  const handleNextBtn = () => {
    expandSideBar();
    const areaId = regionIds[location].toString();
    setAreaRank(areaId, rank);

    getAreaBoards(areaId)
      .then((response: any) => {
        console.log('Boards:', response);
        processDataAndStore(response);
      })
      .catch((error: any) => {
        console.error('Error fetching boards:', error);
      });
  };

  // 가공
  const processDataAndStore = (apiResponse: {
    data: any;
    isSuccess: any;
    code: any;
  }) => {
    const { data, isSuccess, code } = apiResponse;

    if (isSuccess && code === '200') {
      const processedData = {
        area: data.area,
        areaBoardScoreResponse: data.areaBoardScoreResponse.map(
          (item: { categoryName: any; score: any }) => ({
            categoryName: item.categoryName,
            score: item.score,
          }),
        ),
        meanScoreResponses: data.meanScoreResponses.map(
          (item: { detailCategory: any; mean: any }) => ({
            detailCategory: item.detailCategory,
            mean: item.mean,
          }),
        ),
        areaBoardCategoryScoreResponses:
          data.areaBoardCategoryScoreResponses.map(
            (cat: {
              categoryName: any;
              areaDetailBoardResponsList: any[];
            }) => ({
              categoryName: cat.categoryName,
              areaDetailBoardResponsList: cat.areaDetailBoardResponsList.map(
                (d: { bigCategory: any; detailCategory: any; score: any }) => ({
                  bigCategory: d.bigCategory,
                  detailCategory: d.detailCategory,
                  score: d.score,
                }),
              ),
            }),
          ),
      };

      // 데이터를 Zustand 스토어에 저장
      useAreaStore.getState().setAreaData(processedData);
    } else {
      console.error('Failed to process data:', apiResponse);
    }
  };

  return (
    <div
      onMouseEnter={() => {
        console.log(`${location}`);
        onSelectArea(location);
      }}
      onMouseLeave={() => {
        console.log(`${location}`);
        onSelectArea('');
      }}
      onClick={handleNextBtn}
      className={`${styles.container} ${rank <= 3 ? styles.topRank : ''}`}
    >
      <div className={`${styles.number} ${rank <= 3 ? styles.topNumber : ''}`}>
        {rank}
      </div>
      <div className={styles.locationWrapper}>
        <div className={styles.area}>{location}</div>

        <div className={styles.wrapper} onClick={expandSideBar}>
          <div className={styles.next}>동네 보러가기</div>
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

export default Rank;
