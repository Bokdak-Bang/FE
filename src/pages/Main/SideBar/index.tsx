import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Rating from './Rating';
import Ranking from './Ranking';

const SideBar = () => {
  const [showComponent, setShowComponent] = useState('Rating');

  const handleShowRanking = () => {
    setShowComponent('Ranking');
  };

  return (
    <div className={styles.container}>
      {showComponent === 'Rating' ? (
        <Rating onAnalyze={handleShowRanking} />
      ) : (
        <Ranking />
      )}
    </div>
  );
};

export default SideBar;
