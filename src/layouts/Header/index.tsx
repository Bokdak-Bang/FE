import { GnbChat, GnbLogo, GnbProfile, GnbSave } from 'assets';
import React from 'react';
import styles from './Header.module.scss';
import GnbSearchBar from 'components/SearchBar';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <GnbLogo />
        <GnbSearchBar
          value={''}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.menu}>
          <GnbChat className={styles.icon} />
          <span className={styles.label}>채팅상담</span>
        </div>
        <div className={styles.menu}>
          <GnbSave className={styles.icon} />
          <span className={styles.label}>채팅상담</span>
        </div>
        <div className={styles.menu}>
          <GnbProfile className={styles.icon} />
          <span className={styles.label}>홍길동 님</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
