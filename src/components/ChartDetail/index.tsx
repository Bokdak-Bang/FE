import React, { useState, useEffect } from 'react';
import { RightArrowFill, LeftArrowFill } from 'assets';
import styles from './ChartDetail.module.scss';
import BarChart from 'components/BarChart';
import chartData from 'models/chartDataSets.json';
import useAreaStore from 'context/useDetailStroe';

interface ChartDetailProps {
  setSelected: (selected: string) => void;
  selected: string;
  area: string;
}

interface ChartData {
  [category: string]: {
    [subCategory: string]: Array<{
      label: string;
      value: number;
    }>;
  };
}

const data: ChartData = chartData;

const ChartDetail = ({ setSelected, selected, area }: ChartDetailProps) => {
  const { areaData } = useAreaStore();
  console.log('areaData:', areaData);
  const categories = [
    '자연',
    '주택',
    '지역인구',
    '안전',
    '생활편의교통',
    '교육',
    '복지문화',
  ];

  const handleNext = () => {
    const currentIndex = categories.indexOf(selected);
    const nextIndex = (currentIndex + 1) % categories.length;
    setSelected(categories[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = categories.indexOf(selected);
    const prevIndex =
      (currentIndex - 1 + categories.length) % categories.length;
    setSelected(categories[prevIndex]);
  };

  // 현재 선택된 카테고리의 데이터를 추출
  const categoryData = data[selected];

  useEffect(() => {
    if (data[selected]) {
      const keys = Object.keys(data[selected]);
      setSelectedSub(keys[0]); // 첫 번째 subItem의 label을 초기 값으로 설정
    }
  }, [data, selected]);

  // subItems 데이터를 BarChart에 전달
  const subItems = data[selected]
    ? Object.keys(data[selected]).map((key) => ({
        label: key,
        data: data[selected][key].map((item) => ({
          label: item.label,
          value: item.value,
        })),
      }))
    : [];

  const [selectedSub, setSelectedSub] = useState<string>('');

  const barData =
    subItems.find((item) => item.label === selectedSub)?.data || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <LeftArrowFill
          className={styles.arrowIcon}
          onClick={handlePrevious}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.title}>{selected}</div>
        <RightArrowFill
          className={styles.arrowIcon}
          onClick={handleNext}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={styles.infoWrapper}>
        {subItems.map((item, index) => (
          <div
            key={index}
            className={`${item.label === selectedSub ? styles.selectedInfo : styles.info}`}
            onClick={() => setSelectedSub(item.label)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className={styles.detailWrapper}>
        <div className={styles.detail}>
          <div className={styles.title}>서울특별시 평균 미세먼지 농도</div>
          <div className={styles.valueContainer}>
            {' '}
            <div className={styles.leftInfo}>24.6</div>
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
      {/* BarChart에 데이터 전달 */}
      <BarChart
        data={barData}
        selectedSub={selectedSub}
        selected={selected}
        area={area}
      />
    </div>
  );
};

export default ChartDetail;
