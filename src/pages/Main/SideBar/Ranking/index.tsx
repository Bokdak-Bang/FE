import React from 'react';
import styles from './Ranking.module.scss';
import { LeftArrow } from 'assets';
import Rank from 'components/Rank';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
  const navigate = useNavigate();
  const handleBackBtn = () => {
    console.log('back');
    window.location.reload();
  };
  return (
    <>
      <div className={styles.wrapper}>
        <LeftArrow style={{ cursor: 'pointer' }} onClick={handleBackBtn} />
        <div className={styles.title}>중요도를 고려한 동네 순위예요!</div>
      </div>
      <div className={styles.container}>
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
        <Rank />
      </div>
    </>
  );
};

export default Ranking;
