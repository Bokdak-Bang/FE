import GuestHeader from 'layouts/GuestHeader';
import { useState } from 'react';
import styles from './SelectType.module.scss';
import { useNavigate } from 'react-router-dom';
import { Logo150 } from 'assets';
import TypeItem from 'components/Signup/TypeItem';
import CustomButton from 'components/common/Button';

const index = () => {
  const navigator = useNavigate();
  const [isUser, setIsUser] = useState<boolean>();

  return (
    <>
      <GuestHeader />
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo150 />
          <div className={styles.label}>
            <span>이미 회원이신가요?</span>
            <span
              className={styles.signUp}
              onClick={() => navigator('/signin')}
            >
              로그인하기
            </span>
          </div>
        </div>
        <div className={styles.types}>
          <TypeItem type={'user'} onClick={() => setIsUser(true)} />
          <TypeItem type={'estate'} onClick={() => setIsUser(false)} />
        </div>
        <CustomButton
          width={213}
          buttonType={'fill'}
          fontType={'H2'}
          text={'가입하기'}
          onClick={() => navigator('/signup/form', { state: { isUser } })}
        />
      </div>
    </>
  );
};

export default index;
