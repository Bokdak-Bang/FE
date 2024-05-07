import React, { useState } from 'react';
import styles from './Chart.module.scss';
import RaderChart from 'components/RaderChar';
import ChartDetail from 'components/ChartDetail';
import Button from 'components/common/Button';
import { LeftArrow, Share, Save } from 'assets';

interface AgentConnetionProps {
  onClickAgent: () => void;
}

const Chart = ({ onClickAgent }: AgentConnetionProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('강남구');
  const [selected, setSelected] = useState<string>('nature');

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
          <span className={styles.highlight}>1위 강남구</span>
        </div>
      </div>

      {/* 차트 모음 */}
      <div className={styles.chartsWrapper}>
        <div className={styles.raderChartWrapper}>
          <RaderChart />
        </div>
        <ChartDetail />
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
