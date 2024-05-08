import React from 'react';
import styles from './AgentConnetion.module.scss';
import { LeftArrow } from 'assets';
import Agent from 'components/Agent';

const AgentConnetion = () => {
  return (
    <div>
      <div className={styles.header}>
        <LeftArrow />
        <div>내가 찾던 그 동네_동네분석</div>
      </div>

      <div className={styles.title}>
        맘에 드는 동네를 찾았다면 직접 물어보세요!
      </div>

      {/* 공인중개사무소s */}
      <div className={styles.agents}>
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
        <Agent />
      </div>
    </div>
  );
};

export default AgentConnetion;
