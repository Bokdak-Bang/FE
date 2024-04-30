import React from 'react';
import styles from './Button.module.scss';

interface CustomButtonProps {
  width: number;
  buttonType: string;
  fontType: string;
  text: string;
}

const CustomButton = ({
  width,
  buttonType,
  fontType,
  text,
}: CustomButtonProps) => {
  return (
    <button
      className={`${styles.container} ${buttonType === 'fill' ? styles.fill : styles.empty}
      ${fontType === 'H2' && styles.H2} ${fontType === 'B1' && styles.B1}
      ${fontType === 'C1' && styles.C1}`}
      style={{
        width: `${width}px`,
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
