import React, { ChangeEvent, useState } from 'react';
import { GnbSearch } from 'assets';
import styles from './HeaderSearchBar.module.scss';

interface HeaderSearchProps {
  onSave?: (inputValue: string) => void;
}

const HeaderSearchBar = ({ onSave }: HeaderSearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input이 변경될 때마다 호출
    const value = e.target.value;
    setInputValue(value);
    // input 변경될 때마다 저장 -> 확정 x
    if (onSave) onSave(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSave) {
      onSave(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <GnbSearch className={styles.icon} />
      <input
        className={styles.input}
        type="search"
        placeholder="행정동을 검색해보세요!"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default HeaderSearchBar;
