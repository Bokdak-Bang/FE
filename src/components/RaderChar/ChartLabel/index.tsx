import React from 'react';
import styles from './ChartLabel.module.scss';

interface ChartLabelProps {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  score: number;
  style: React.CSSProperties;
  onClick?: () => void;
  selected: string;
}

const ChartLabel: React.FC<ChartLabelProps> = ({
  label,
  icon: Icon,
  score,
  style,
  onClick,
  selected,
}) => {
  const isSelected = label === selected;

  return (
    <div style={style} onClick={onClick}>
      <div className={styles.label}>{label}</div>
      <div
        className={` ${!isSelected ? styles.container : styles.selectedContainer}`}
      >
        <Icon className={styles.icon} />
        <div
          className={` ${!isSelected ? styles.score : styles.selectedScore}`}
        >
          {score}점
        </div>
      </div>
    </div>
  );
};

export default ChartLabel;
