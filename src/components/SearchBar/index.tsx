import React from 'react';
import { GnbSearch } from 'assets';
import styles from './GnbSearchBar.module.scss';

interface GnbSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GnbSearchBar = ({ value, onChange }: GnbSearchBarProps) => {
  return (
    <div className={styles.container}>
      <GnbSearch className={styles.icon} />
      <input
        className={styles.input}
        type="search"
        placeholder="행정동을 검색해보세요!"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default GnbSearchBar;
