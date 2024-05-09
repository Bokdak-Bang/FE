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
    natureScore: 2.5,
    residenceScore: 2.5,
    populationScore: 2.5,
    securityScore: 2.5,
    lifeScore: 2.5,
    educationScore: 2.5,
    welfareScore: 2.5,
  });

  // 각 슬라이더 값을 설정하는 함수
  const setValue = (key: keyof typeof values) => (newValue: number) => {
    setValues((prevValues) => ({ ...prevValues, [key]: newValue }));
  };

  // 모든 슬라이더를 초기화하는 함수
  const handleReset = () => {
    setValues({
      natureScore: 2.5,
      residenceScore: 2.5,
      populationScore: 2.5,
      securityScore: 2.5,
      lifeScore: 2.5,
      educationScore: 2.5,
      welfareScore: 2.5,
    });
  };

  // '분석' 버튼의 onClick 이벤트 핸들러
  const handleAnalyzeClick = async () => {
    onAnalyze();
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
          onClick={handleAnalyzeClick}
        />
      </div>
    </>
  );
};

export default Rating;
