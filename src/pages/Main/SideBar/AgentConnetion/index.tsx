/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './AgentConnetion.module.scss';
import { LeftArrow } from 'assets';
import agentData from 'models/agent.json';
import Agent from 'components/Agent';

interface AgentData {
  id: number;
  img: string;
  name: string;
  location: string;
  call: string;
}
interface AgentConnetionProps {
  setShowComponent: (component: string) => void;
}

const agents: AgentData[] = (agentData as any).agents;

const AgentConnection: React.FC<AgentConnetionProps> = ({
  setShowComponent,
}) => {
  const handleBackBtn = () => {
    setShowComponent('Chart');
  };
  return (
    <div>
      <div className={styles.header}>
        <LeftArrow onClick={handleBackBtn} style={{ cursor: 'pointer' }} />
        <div>내가 찾던 그 동네_동네분석</div>
      </div>

      <div className={styles.title}>
        맘에 드는 동네를 찾았다면 직접 물어보세요!
      </div>

      <div className={styles.agents}>
        {agents.map((agent) => (
          <Agent
            key={agent.id}
            img={agent.img}
            name={agent.name}
            location={agent.location}
            call={agent.call}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentConnection;
