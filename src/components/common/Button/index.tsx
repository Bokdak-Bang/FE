import React from 'react';
import styles from './Button.module.scss';

interface CustomButtonProps {
  horizontalpadding: number;
  fontType: string;
  text: string;
}

const CustomButton = ({
  horizontalpadding,
  fontType,
  text,
}: CustomButtonProps) => {
  return (
    <button
      className={`${styles.container} ${fontType === '배송준비중' && styles.active}/`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
