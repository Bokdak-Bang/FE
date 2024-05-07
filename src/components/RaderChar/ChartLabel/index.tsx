import React from 'react';
import styles from './ChartLabel.module.scss';

interface ChartLabelProps {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  score: number;
  style: React.CSSProperties;
}

const ChartLabel: React.FC<ChartLabelProps> = ({
  label,
  icon: Icon,
  score,
  style,
}) => {
  return (
    <div style={style} className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.container}>
        <Icon className={styles.icon} />
        <div className={styles.score}>{score}점</div>
      </div>
    </div>
  );
};

export default ChartLabel;
