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
import { useMemberStore } from 'utils/useMemberStore';

const Header = () => {
  const navigator = useNavigate();
  const getMember = useMemberStore((state) => state.getMember);
  const userName = getMember();

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
            <span className={styles.label} onClick={() => navigator('/save')}>
              동네저장
            </span>
          </div>
          <div className={styles.menu} onClick={handleProfileOpen}>
            <GnbProfile className={styles.icon} />
            <span className={styles.label}>홍길동 님</span>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className={styles.dropDown}>
          <div className={styles.header}>
            <img src="images/profile-default.svg" className={styles.img} />{' '}
            {userName ? { userName } + ' 님' : 'guest'}
          </div>
          <div className={styles.seperator} />
          <div className={styles.content} onClick={() => navigator('/mypage')}>
            <DropDown1 />
            마이페이지
          </div>
          <div className={styles.seperator} />
          <div className={styles.content}>
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
