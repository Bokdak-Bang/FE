import React, { useEffect, useState } from 'react';
import Map from 'components/Map';
import SideBar from './SideBar';
import styles from './Main.module.scss';
import { ChatEx } from 'assets';

const Main = () => {
  const [activeArea, setActiveArea] = useState('');
  const isUser = sessionStorage.getItem('isUser');

  // hover될때 activeArea가 변경되게
  useEffect(() => {
    console.log(`active area: ${activeArea}`);
  }, [activeArea]);

  return (
    <>
      {isUser !== 'false' ? (
        <>
          <SideBar onSelectArea={setActiveArea} />
          <Map activeArea={activeArea} />
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>채팅 목록</div>
          <div className={styles.content}>
            <ChatEx
              onClick={() => {
                alert('서비스 준비 중입니다');
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
