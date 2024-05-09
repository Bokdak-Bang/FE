import React from 'react';
import styles from './Rank.module.scss';
import { RightArrow } from 'assets';
import { getAreaBoards } from 'apis/DataBoardsApi';

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
      })
      .catch((error: any) => {
        console.error('Error fetching boards:', error);
      });
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
      <div className={styles.town}>{location}</div>
      <div className={styles.wrapper} onClick={expandSideBar}>
        <div className={styles.next}>동네 보러가기</div>
        <RightArrow />
      </div>
    </div>
  );
};

export default Rank;
