import React from 'react';
import styles from './Ranking.module.scss';
import { LeftArrow } from 'assets';
import Rank from 'components/Rank';
import { useNavigate } from 'react-router-dom';
import ranks from 'models/rank.json';

interface RankingProps {
  expandSideBar: () => void;
  onSelectArea: (area: string) => void;
  setAreaRank: (area: string, rank: number) => void;
  area: string;
  rank: number;
}

const Ranking = ({
  expandSideBar,
  onSelectArea,
  setAreaRank,
}: RankingProps) => {
  const handleBackBtn = () => {
    console.log('back');
    window.location.reload();
  };
  return (
    <>
      <div className={styles.wrapper}>
        <LeftArrow style={{ cursor: 'pointer' }} onClick={handleBackBtn} />
        <div className={styles.title}>중요도를 고려한 동네 순위예요!</div>
      </div>
      <div className={styles.container}>
        {ranks.map((rank) => (
          <Rank
            key={rank.id}
            rank={rank.rank}
            location={rank.location}
            expandSideBar={expandSideBar}
            onSelectArea={onSelectArea}
            setAreaRank={setAreaRank}
          />
        ))}
      </div>
    </>
  );
};

export default Ranking;
