import React, { useState } from 'react';
import styles from './Rating.module.scss';
import Slider from 'components/Slider';
import Button from 'components/common/Button';
import { postDataArea } from 'apis/DataAreaApi';
import useStore from 'context/useStore';
import {
  Nature,
  House,
  Population,
  Safety,
  Education,
  Welfare,
  Traffic,
  Reset,
} from 'assets';

interface RatingProps {
  onAnalyze: () => void;
}

const Rating = ({ onAnalyze }: RatingProps) => {
  const [values, setValues] = useState({
    natureScore: 3,
    residenceScore: 3,
    populationScore: 3,
    securityScore: 3,
    lifeScore: 3,
    educationScore: 3,
    welfareScore: 3,
  });

  // 각 슬라이더 값을 설정하는 함수
  const setValue = (key: keyof typeof values) => (newValue: number) => {
    setValues((prevValues) => ({ ...prevValues, [key]: newValue }));
  };

  // 모든 슬라이더를 초기화하는 함수
  const handleReset = () => {
    setValues({
      natureScore: 3,
      residenceScore: 3,
      populationScore: 3,
      securityScore: 3,
      lifeScore: 3,
      educationScore: 3,
      welfareScore: 3,
    });
  };

  const handleAnalyzeClick = async () => {
    try {
      const {
        natureScore,
        residenceScore,
        populationScore,
        securityScore,
        lifeScore,
        educationScore,
        welfareScore,
      } = values;

      const response = await postDataArea(
        natureScore,
        residenceScore,
        populationScore,
        securityScore,
        lifeScore,
        educationScore,
        welfareScore,
      );

      if (response.code === '200' && response.isSuccess) {
        // 데이터를 올바른 타입으로 변환하여 스토어에 저장
        useStore.getState().setAreaScores(response.data.areaScoreResponseList);
      }
      console.log('Analysis results:', response);
      onAnalyze(); // 분석 완료 후 onAnalyze 콜백 호출
    } catch (error) {
      console.error('Failed to post data:', error);
    }
  };

  // 슬라이더 구성 요소 정보
  const sliderComponents = [
    { key: 'natureScore', title: '자연', Icon: Nature },
    { key: 'residenceScore', title: '주택', Icon: House },
    { key: 'populationScore', title: '지역인구', Icon: Population },
    { key: 'securityScore', title: '안전', Icon: Safety },
    { key: 'lifeScore', title: '생활편의교통', Icon: Traffic },
    { key: 'educationScore', title: '교육', Icon: Education },
    { key: 'welfareScore', title: '복지문화', Icon: Welfare },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>당신의 삶에는 어떤 게 중요할까요?</div>
      {sliderComponents.map(({ key, title, Icon }) => (
        <Slider
          key={key}
          value={values[key as keyof typeof values]}
          title={title}
          ReactComponent={Icon}
          onChange={setValue(key as keyof typeof values)}
        />
      ))}
      <div className={styles.btnWrapper}>
        <button className={styles.reset} onClick={handleReset}>
          <Reset />
          초기화
        </button>
        <Button
          width={247}
          buttonType={'fill'}
          fontType={'H2'}
          text={'분석'}
          onClick={handleAnalyzeClick}
        />
      </div>
    </div>
  );
};

export default Rating;
