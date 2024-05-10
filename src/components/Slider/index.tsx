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
    const newValue = Number(event.target.value);
    onChange(newValue);
    event.target.style.setProperty('--slider-value', `${(newValue - 1) * 25}%`);
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

      <div className={styles.barWrapper}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.bar}></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
