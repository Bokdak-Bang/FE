import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Rating.module.scss';
import Slider from 'components/Slider';
import Button from 'components/common/Button';
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
  const navigate = useNavigate();
  const [values, setValues] = useState({
    natureValue: 1,
    houseValue: 1,
    populationValue: 1,
    safetyValue: 1,
    trafficValue: 1,
    educationValue: 1,
    welfareValue: 1,
  });

  // 각 슬라이더 값을 설정하는 함수
  const setValue = (key: keyof typeof values) => (newValue: number) => {
    setValues((prevValues) => ({ ...prevValues, [key]: newValue }));
  };

  // 모든 슬라이더를 초기화하는 함수
  const handleReset = () => {
    setValues({
      natureValue: 2.5,
      houseValue: 2.5,
      populationValue: 2.5,
      safetyValue: 2.5,
      trafficValue: 2.5,
      educationValue: 2.5,
      welfareValue: 2.5,
    });
  };

  // 슬라이더 구성 요소 정보
  const sliderComponents = [
    { key: 'natureValue', title: '자연', Icon: Nature },
    { key: 'houseValue', title: '주택', Icon: House },
    { key: 'populationValue', title: '지역인구', Icon: Population },
    { key: 'safetyValue', title: '안전', Icon: Safety },
    { key: 'trafficValue', title: '생활편의교통', Icon: Traffic },
    { key: 'educationValue', title: '교육', Icon: Education },
    { key: 'welfareValue', title: '복지문화', Icon: Welfare },
  ];

  return (
    <>
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
          onClick={onAnalyze}
        />
      </div>
    </>
  );
};

export default Rating;
