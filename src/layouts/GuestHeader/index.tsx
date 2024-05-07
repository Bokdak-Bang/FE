import { GnbLogo } from 'assets';

import styles from './GuestHeader.module.scss';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigator = useNavigate();

  return (
    <div className={styles.container}>
      <GnbLogo onClick={() => navigator('/')} />
    </div>
  );
};

export default index;
