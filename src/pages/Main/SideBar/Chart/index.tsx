import React, { useState } from 'react';
import styles from './Chart.module.scss';
import RaderChart from 'components/RaderChar';
import ChartDetail from 'components/ChartDetail';
import Button from 'components/common/Button';
import { LeftArrow, Share, Save } from 'assets';
import { saveUserArea } from 'apis/\bDataBoardsApi';
import { useLocation, useNavigate } from 'react-router-dom';

interface AgentConnetionProps {
  onClickAgent: () => void;
  area: string;
  rank: number;
  setAreaRank: (area: string, rank: number) => void;
  setWidth: (width: string) => void;
  setShowComponent: (component: string) => void;
}

const Chart = ({
  onClickAgent,
  area,
  rank,
  setAreaRank,
  setWidth,
  setShowComponent,
}: AgentConnetionProps) => {
  const navigator = useNavigate();
  const handlBackBtn = () => {
    setWidth('394px');
    setShowComponent('Ranking');
  };
  const userName = sessionStorage.getItem('name');
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
  // 선택된 지표가 뭐니?
  const [selected, setSelected] = useState<string>('자연');

  const handleShareBtn = () => {
    alert('개발중입니다.');
  };
  const handleSaveBtn = async () => {
    const areaId = regionIds[area]; // 지역명으로부터 ID를 찾습니다
    if (!areaId) {
      console.error('Invalid area name');
      return;
    }

    try {
      const response = await saveUserArea(areaId.toString()); // API 호출
      console.log('Save successful:', response);
      alert('저장되었습니다!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장에 실패했습니다.');
      navigator('/signin');
    }
  };
  return (
    <div>
      <div className={styles.header}>
        <LeftArrow onClick={handlBackBtn} style={{ cursor: 'pointer' }} />
        <div>내가 찾던 그 동네_동네분석</div>
      </div>
      <div className={styles.mainTitle}>
        <div>
          {userName ? userName : 'Guest'} 님에게 추천하는 동네{' '}
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
