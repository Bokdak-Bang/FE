import React, { ChangeEvent, useState } from 'react';
import styles from './input.module.scss';

interface InputProps {
  placeHolder: string;
  type: string;
  onSave?: (inputValue: string) => void;
}

const Input = ({ placeHolder, type, onSave }: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input이 변경될 때마다 호출
    const value = e.target.value;
    setInputValue(value);
    // // input 변경될 때마다 저장 -> 확정 x
    // if (onSave) onSave(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSave) {
      onSave(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type={type}
        value={inputValue}
        placeholder={placeHolder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <span className={styles.label}>{placeHolder}</span>
    </div>
  );
};

export default Input;
