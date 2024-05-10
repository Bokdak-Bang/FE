import { getLoginToken } from 'hooks/SignInHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Save.module.scss';
import { SaveLo, Share } from 'assets';
import Button from 'components/common/Button';
import RaderChart from 'components/RaderChar';

const Save = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (!getLoginToken()) {
      // 로그인되어있지 않으면 로그인 화면으로 이동
      navigator('/signin');
    }
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.title}>관심 동네</div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.area}>강남구</div>
            <SaveLo />
          </div>
          <div className={styles.btnWrapper}>
            <Share />
            <Button
              width={212}
              buttonType={'fill'}
              fontType={'B1'}
              text={'둘러보기'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
