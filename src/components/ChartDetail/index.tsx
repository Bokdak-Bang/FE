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
  const [selectedSub, setSelectedSub] = useState<string>('');
  const categories = [
    '자연',
    '주택',
    '지역인구',
    '안전',
    '생활편의교통',
    '교육',
    '복지문화',
  ];
  const detailCategoryMapMean: { [key: string]: string } = {
    '미세먼지 평균농도': 'pm10Mean',
    '일산화탄소 평균농도': 'co2Mean',
    '도시공원 면적': 'greenSumMean',
    '1인당 주 연면적': 'landAreaMean',
    '신축 주택 비율': 'expansionRateMean',
    '주거용 토지 공시지가': 'landPriceMean',
    '유소년 인구 비율': 'youthPeopleMean',
    '생산인구 비율': 'productivePeopleMean',
    '고령인구 비율': 'oldPeopleMean',
    '1인 가구 비율': 'onePersonHouseWholeRateMean',
    '화재 안전등급': 'fireMean',
    '교통사고 안전등급': 'accidentMean',
    '범죄 안전등급': 'criminalMean',
    '생활안전 안전등급': 'lifeSecurityMean',
    '버스 정류장 수': 'busStationNumberMean',
    '지하철 역 수': 'subwayStationNumberMean',
    '초등학교 수': 'elementarySchoolMean',
    '중학교 수': 'middleSchoolMean',
    '고등학교 수': 'highSchoolMean',
    '문화시설 수': 'cultureFacilityMean',
    '체육시설 수': 'gymFacilityMean',
  };
  const detailCategoryMap: { [key: string]: string } = {
    '미세먼지 평균농도': 'pm10Mean',
    '일산화탄소 평균농도': 'co2Mean',
    '도시공원 면적': 'greenSum',
    '1인당 주 연면적': 'landArea',
    '신축 주택 비율': 'expansionRate',
    '주거용 토지 공시지가': 'landPrice',
    '유소년 인구 비율': 'youthPeople',
    '생산인구 비율': 'productivePeople',
    '고령인구 비율': 'oldPeople',
    '1인 가구 비율': 'onePersonHouseWholeRate',
    '화재 안전등급': 'fire',
    '교통사고 안전등급': 'accident',
    '범죄 안전등급': 'criminal',
    '생활안전 안전등급': 'lifeSecurity',
    '버스 정류장 수': 'busStationNumber',
    '지하철 역 수': 'subwayStationNumber',
    '초등학교 수': 'elementschool',
    '고등학교 수': 'highschool',
    '중학교 수': 'middleschool',
    '문화시설 수': 'cultureFacility',
    '체육시설 수': 'gymFacility',
  };
  const selectedDetailCategoryMain = detailCategoryMap[selectedSub];
  const selectedDetailCategory = detailCategoryMapMean[selectedSub];
  console.log('selectedDetailCategory:', selectedDetailCategory);

  // 해당 detailCategory의 평균 데이터 찾기
  const selectedMeanData = areaData
    ? areaData.meanScoreResponses.find(
        (item) => item.detailCategory === selectedDetailCategory,
      )
    : null;

  const meanValue = selectedMeanData ? selectedMeanData.mean : 0; // 평균 값

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

  const areaScore = areaData
    ? areaData.areaBoardCategoryScoreResponses
        .flatMap((cat) => cat.areaDetailBoardResponsList)
        .find((detail) => detail.detailCategory === selectedDetailCategoryMain)
        ?.score
    : null;

  const barData =
    subItems.find((item) => item.label === selectedSub)?.data || [];

  useEffect(() => {
    if (selected && data[selected]) {
      const subCategories = Object.keys(data[selected]);
      if (subCategories.length > 0 && selected === '안전') {
        setSelectedSub(subCategories[2]);
      } else if (subCategories.length > 0 && selected !== '안전') {
        setSelectedSub(subCategories[0]);
      }
    }
  }, [selected, data]);

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
        {subItems
          .filter(
            (item) => !['사고 수', 'cctv 수', '자살 수'].includes(item.label),
          )
          .map((item, index) => (
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
          <div className={styles.title}>서울특별시 평균 {selectedSub}</div>
          <div className={styles.valueContainer}>
            {' '}
            <div className={styles.leftInfo}>{meanValue}</div>
          </div>
        </div>
        <div
          className={styles.detail}
          style={{
            borderLeft:
              '1px solid var(--PRIMARY-20_80, rgba(157, 215, 215, 0.80))',
          }}
        >
          <div className={styles.title}>{area}</div>
          <div className={styles.rightInfo}>{areaScore ?? 'N/A'}</div>
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
