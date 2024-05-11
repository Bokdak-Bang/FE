import React from 'react';
import styles from './Ranking.module.scss';
import { LeftArrow } from 'assets';
import Rank from 'components/Rank';
import useStore from 'context/useStore';

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
  const regionNames = {
    1: '강남구',
    2: '강동구',
    3: '강북구',
    4: '강서구',
    5: '관악구',
    6: '광진구',
    7: '구로구',
    8: '금천구',
    9: '노원구',
    10: '도봉구',
    11: '동대문구',
    12: '동작구',
    13: '마포구',
    14: '서대문구',
    15: '서초구',
    16: '성동구',
    17: '성북구',
    18: '송파구',
    19: '양천구',
    20: '영등포구',
    21: '용산구',
    22: '은평구',
    23: '종로구',
    24: '중구',
    25: '중랑구',
  };

  const areaScores = useStore((state) => state.areaScores);
  const handleBackBtn = () => {
    console.log('back');
    window.location.reload();
  };
  const sortedScores = areaScores.slice().sort((a, b) => b.score - a.score);
  return (
    <>
      <div className={styles.wrapper}>
        <LeftArrow style={{ cursor: 'pointer' }} onClick={handleBackBtn} />
        <div className={styles.title}>중요도를 고려한 동네 순위예요!</div>
      </div>
      <div className={styles.container}>
        {sortedScores.map((areaScore, index) => (
          <Rank
            key={areaScore.id}
            rank={index + 1}
            location={regionNames[areaScore.id as keyof typeof regionNames]}
            expandSideBar={expandSideBar}
            onSelectArea={() =>
              onSelectArea(
                regionNames[areaScore.id as keyof typeof regionNames],
              )
            }
            setAreaRank={() =>
              setAreaRank(
                regionNames[areaScore.id as keyof typeof regionNames],
                index + 1,
              )
            }
          />
        ))}
      </div>
    </>
  );
};

export default Ranking;
