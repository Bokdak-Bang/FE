import styles from './Button.module.scss';

interface CustomButtonProps {
  width: number;
  height?: number;
  buttonType: string;
  fontType: string;
  text: string;
  onClick?: () => void;
}

const CustomButton = ({
  width,
  buttonType,
  fontType,
  text,
  height,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      className={`${styles.container} ${buttonType === 'fill' ? styles.fill : styles.empty}
      ${fontType === 'H2' && styles.H2} ${fontType === 'B1' && styles.B1}
      ${fontType === 'C1' && styles.C1}`}
      style={{
        width: `${width}px`,
        ...(height && { height: `${height}px` }),
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
