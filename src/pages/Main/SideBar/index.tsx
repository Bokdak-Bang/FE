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

  const [area, setArea] = useState('강남구');
  const [rank, setRank] = useState(1);

  const setAreaRank = (area: string, rank: number) => {
    setArea(area);
    setRank(rank);
  };

  return (
    <div className={styles.container} style={{ width: width }}>
      {showComponent === 'Rating' && <Rating onAnalyze={handleShowRanking} />}
      {showComponent === 'Ranking' && (
        <Ranking
          expandSideBar={expandSideBar}
          onSelectArea={onSelectArea}
          area={area}
          setAreaRank={setAreaRank}
          rank={rank}
        />
      )}
      {showComponent === 'Chart' && (
        <Chart
          onClickAgent={handleShowAgentConnetion}
          area={area}
          rank={rank}
          setAreaRank={setAreaRank}
          setWidth={setWidth}
          setShowComponent={setShowComponent}
        />
      )}
      {showComponent === 'AgentConnetion' && (
        <AgentConnetion setShowComponent={setShowComponent} />
      )}
    </div>
  );
};

export default SideBar;
