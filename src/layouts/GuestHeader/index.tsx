import { GnbLogo } from 'assets';

import styles from './GuestHeader.module.scss';

const index = () => {
  return (
    <div className={styles.container}>
      <GnbLogo />
    </div>
  );
};

export default index;
