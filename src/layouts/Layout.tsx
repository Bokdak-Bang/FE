import { Outlet } from 'react-router-dom';
import Header from './Header';

import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
