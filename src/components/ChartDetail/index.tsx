import React from 'react';
import { RightArrowFill, LeftArrowFill } from 'assets';
import styles from './ChartDetail.module.scss';
import BarChart from 'components/BarChart';

const ChartDetail = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <LeftArrowFill className={styles.arrowIcon} />
        <div className={styles.title}>자연</div>
        <RightArrowFill className={styles.arrowIcon} />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.info}>겨울철 체감온도</div>
        <div className={styles.info}>겨울철 체감온도</div>
        <div className={styles.info}>겨울철 체감온도</div>
      </div>
      <div className={styles.detailWrapper}>
        <div className={styles.detail}>
          <div className={styles.title}>서울특별시 평균 미세먼지 농도</div>
          <div className={styles.valueContainer}>
            {' '}
            {/* 새로운 컨테이너 div */}
            <div className={styles.leftInfo}>24.6</div>
            <div className={styles.ect}>(단위 : ㎍/㎥)</div>
          </div>
        </div>

        <div
          className={styles.detail}
          style={{
            borderLeft:
              '1px solid var(--PRIMARY-20_80, rgba(157, 215, 215, 0.80))',
          }}
        >
          <div className={styles.title}>강남구</div>
          <div className={styles.rightInfo}>21.2</div>
        </div>
      </div>

      {/* 그래프 */}
      <div>
        <BarChart />
      </div>
    </div>
  );
};

export default ChartDetail;
