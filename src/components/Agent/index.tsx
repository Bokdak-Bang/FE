import { Location, Call } from 'assets';
import Button from 'components/common/Button';
import styles from './Agent.module.scss';
// import { 동네전문가 } from 'assets';

interface AgentProps {
  img: string;
  name: string;
  location: string;
  call: string;
}
const Agent = ({ img, name, location, call }: AgentProps) => {
  return (
    <div className={styles.agent}>
      <img src={img} alt="agent" className={styles.img} />
      <div className={styles.infoWrapper}>
        <div className={styles.name}>{name}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div className={styles.wrapper}>
            <Location />
            <div>{location}</div>
          </div>
          <div className={styles.wrapper}>
            <Call />
            <div>{call}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <Button
            width={117}
            height={31}
            buttonType="fill"
            fontType="C1"
            text="동네 묻기"
          />
        </div>
      </div>
    </div>
  );
};

export default Agent;
