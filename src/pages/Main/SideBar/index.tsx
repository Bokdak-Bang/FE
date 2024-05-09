import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Rating from './Rating';
import Ranking from './Ranking';
import Chart from './Chart';
import AgentConnetion from './AgentConnetion';

interface SideBarProps {
  onSelectArea: (area: string) => void;
}

const SideBar = ({ onSelectArea }: SideBarProps) => {
  const [showComponent, setShowComponent] = useState('Rating');
  const [width, setWidth] = useState('394px');

  const handleShowRanking = () => {
    setShowComponent('Ranking');
  };

  const handleShowAgentConnetion = () => {
    setShowComponent('AgentConnetion');
  };

  const expandSideBar = () => {
    setWidth('1264px');
    setShowComponent('Chart');
  };

  return (
    <div className={styles.container} style={{ width: width }}>
      {showComponent === 'Rating' && <Rating onAnalyze={handleShowRanking} />}
      {showComponent === 'Ranking' && (
        <Ranking expandSideBar={expandSideBar} onSelectArea={onSelectArea} />
      )}
      {showComponent === 'Chart' && (
        <Chart onClickAgent={handleShowAgentConnetion} />
      )}
      {showComponent === 'AgentConnetion' && <AgentConnetion />}
    </div>
  );
};

export default SideBar;
