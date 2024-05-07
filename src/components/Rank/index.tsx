import React from 'react';
import styles from './Rank.module.scss';
import { RightArrow } from 'assets';

interface RankProps {
  expandSideBar: () => void;
}
const Rank = ({ expandSideBar }: RankProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>1</div>
      <div className={styles.town}>강남구</div>
      <div className={styles.wrapper} onClick={expandSideBar}>
        <div className={styles.next}>동네 보러가기</div>
        <RightArrow />
      </div>
    </div>
  );
};

export default Rank;
