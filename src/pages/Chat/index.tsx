import { getLoginToken } from 'hooks/SignInHooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.scss';

const Chat = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (!getLoginToken()) {
      // 로그인되어있지 않으면 로그인 화면으로 이동
      navigator('/signin');
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>채팅상담</div>
      <div className={styles.content}>
        나의 동네를 찾고 공인중개사와 상담을 진행해보세요!
      </div>
    </div>
  );
};

export default Chat;
