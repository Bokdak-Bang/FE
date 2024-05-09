import React, { useState } from 'react';
import styles from './Chart.module.scss';
import RaderChart from 'components/RaderChar';
import ChartDetail from 'components/ChartDetail';
import Button from 'components/common/Button';
import { LeftArrow, Share, Save } from 'assets';

interface AgentConnetionProps {
  onClickAgent: () => void;
  area: string;
  rank: number;
  setAreaRank: (area: string, rank: number) => void;
}

const Chart = ({
  onClickAgent,
  area,
  rank,
  setAreaRank,
}: AgentConnetionProps) => {
  // 선택된 지표가 뭐니?
  const [selected, setSelected] = useState<string>('자연');

  const handleShareBtn = () => {
    console.log('share');
  };
  const handleSaveBtn = () => {
    console.log('save');
  };
  return (
    <div>
      <div className={styles.header}>
        <LeftArrow />
        <div>내가 찾던 그 동네_동네분석</div>
      </div>
      <div className={styles.mainTitle}>
        <div>
          홍길동 님에게 추천하는 동네{' '}
          <span className={styles.highlight}>
            {rank}위 {area}
          </span>
        </div>
      </div>

      {/* 차트 모음 */}
      <div className={styles.chartsWrapper}>
        <div className={styles.raderChartWrapper}>
          <RaderChart setSelected={setSelected} selected={selected} />
        </div>
        <ChartDetail
          setSelected={setSelected}
          selected={selected}
          area={area}
        />
      </div>

      {/* 맨아래 공유/저장/공인중개사 연결 */}
      <div className={styles.footer}>
        <Share onClick={handleShareBtn} className={styles.btn} />
        <Save onClick={handleSaveBtn} className={styles.btn} />
        <Button
          width={212}
          buttonType="fill"
          fontType="B1"
          text="공인중개사 연결"
          onClick={onClickAgent}
        />
      </div>
    </div>
  );
};

export default Chart;
