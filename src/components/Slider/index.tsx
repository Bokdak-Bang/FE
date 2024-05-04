import React from 'react';
import styles from './Slider.module.scss';

interface SliderProps {
  value: number;
  title: string;
  ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange: (value: number) => void;
}

const Slider = ({ value, title, ReactComponent, onChange }: SliderProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ReactComponent />
        <div className={styles.title}>{title}</div>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={handleSliderChange}
        className={styles.slider}
      />

      {/* 아래 눈금들 */}
      <div className={styles.barWrapper}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default Slider;
