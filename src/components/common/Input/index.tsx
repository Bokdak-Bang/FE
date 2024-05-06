import React, {
  ChangeEvent,
  PropsWithChildren,
  forwardRef,
  useState,
} from 'react';
import styles from './input.module.scss';

interface InputProps {
  placeHolder: string;
  type: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (props, ref) => {
    const { placeHolder, type, onKeyDown } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      // input이 변경될 때마다 호출
      const value = e.target.value;
      setInputValue(value);
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <input
            ref={ref}
            className={styles.inputArea}
            type={type}
            value={inputValue}
            placeholder={placeHolder}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          />
          <span className={styles.label}>{placeHolder}</span>
        </div>
      </div>
    );
  },
);

Input.displayName = 'CustomInput';

export default Input;
