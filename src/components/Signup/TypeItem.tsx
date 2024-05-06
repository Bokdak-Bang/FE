import React from 'react';
import styles from './TypeItem.module.scss';
import { Estate, User } from 'assets';

interface TypeItemProps {
  type: string;
}
const TypeItem = ({ type }: TypeItemProps) => {
  const label =
    type === 'user'
      ? '나의 새로운 터전을 찾아보자!'
      : '고객들의 상담과 연락을 간단하게!';
  const title = type === 'user' ? '일반 회원' : '공인중개사';
  const content =
    type == 'user'
      ? [
          '· 나에게 맞는, 내가 살고 싶은 동네 찾기',
          '· 찾은 동네를 저장하고 공유하기',
          '· 동네의 공인중개사와 간단한 1대1 상담',
        ]
      : [
          '· 행정동을 찾아오는 상담 고객 유치',
          '· 지속적인 상담 고객 관리',
          '· 간단한 비대면 상담으로 연결',
        ];

  return (
    <button className={styles.container}>
      <div className={styles.labelContainer}>
        <div className={styles.label}>{label}</div>
        <div className={styles.underline} />
      </div>
      {type === 'user' ? <User /> : <Estate />}
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {content.map((item, index) => (
          <div key={index} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
    </button>
  );
};

export default TypeItem;
