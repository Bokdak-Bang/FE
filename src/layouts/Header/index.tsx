import {
  DropDown1,
  DropDown2,
  DropDown3,
  GnbChat,
  GnbLogo,
  GnbProfile,
  GnbSave,
} from 'assets';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import HeaderSearchBar from 'components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { getUserAreas } from 'apis/\bDataBoardsApi';

const Header = () => {
  const navigator = useNavigate();
  const userName = sessionStorage.getItem('name');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typingValue, setTypingValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleProfileOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = (s: string) => {
    setTypingValue(s);
    console.log(s);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigator('/');
  };

  const handleSaveArea = async () => {
    try {
      const userAreas = await getUserAreas();
      console.log('User areas:', userAreas);
      navigator('/save');
    } catch (error) {
      console.error('Failed to fetch user areas:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <GnbLogo
            onClick={() => navigator('/')}
            style={{ cursor: 'pointer' }}
          />
          <HeaderSearchBar onSave={handleSave} />
        </div>
        <div className={styles.right}>
          <div className={styles.menu}>
            <GnbChat className={styles.icon} />
            <span className={styles.label} onClick={() => navigator('/chat')}>
              채팅상담
            </span>
          </div>
          <div className={styles.menu}>
            <GnbSave className={styles.icon} />
            <span className={styles.label} onClick={handleSaveArea}>
              동네저장
            </span>
          </div>
          <div className={styles.menu} onClick={handleProfileOpen}>
            <GnbProfile className={styles.icon} />
            <span className={styles.label}>
              {userName ? userName + '님' : 'Guest'}
            </span>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className={styles.dropDown}>
          <div className={styles.header}>
            <img src="images/profile-default.svg" className={styles.img} />{' '}
            {userName ? userName + '님' : 'Guest'}
          </div>
          <div className={styles.seperator} />
          <div className={styles.content} onClick={() => navigator('/mypage')}>
            <DropDown1 />
            마이페이지
          </div>
          <div className={styles.seperator} />
          <div className={styles.content} onClick={handleLogout}>
            <DropDown2 />
            로그아웃
          </div>
          <div className={styles.seperator} />
          <div className={styles.content}>
            <DropDown3 />
            회원탈퇴
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Header;
