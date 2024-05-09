import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

import styles from './Layout.module.scss';

const Layout = () => {
  const location = useLocation();

  // 현재 URL이 signin, signup 문자열을 포함하는지 확인
  const isSignInUrl = location.pathname.includes('/signin');
  const isSignUpUrl = location.pathname.includes('/signup');

  return (
    <div className={styles.container}>
      {isSignInUrl || isSignUpUrl ? null : <Header />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
