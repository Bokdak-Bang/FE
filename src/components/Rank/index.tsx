import React from 'react';
import styles from './Rank.module.scss';
import { RightArrow } from 'assets';

interface RankProps {
  rank: number;
  location: string;
  expandSideBar: () => void;
  onSelectArea: (area: string) => void;
}

const Rank = ({ expandSideBar, rank, location, onSelectArea }: RankProps) => {
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
      onClick={expandSideBar}
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
