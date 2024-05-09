import React, { useRef } from 'react';

import styles from './SignIn.module.scss';
import { Logo150 } from 'assets';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';
import GuestHeader from 'layouts/GuestHeader';
import { useNavigate } from 'react-router-dom';
import { setLoginSession } from 'hooks/SignInHooks';

const index = () => {
  const navigator = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // email 및 password 입력 시
    if (email && password) {
      const isLogin = setLoginSession(email, password);
      if (isLogin) {
        // 로그인 성공 시 메인 페이지로 이동
        navigator('/');
      } else {
        // 로그인 실패
        alert('로그인 실패');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <GuestHeader />
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo150 />
          <div className={styles.title}>
            내가 터 잡을 동네, 안락한 나의 동네를 찾아보세요!
          </div>
          <div className={styles.label}>
            <span>회원이 아니신가요?</span>
            <span
              className={styles.signUp}
              onClick={() => navigator('/signup')}
            >
              회원가입하기
            </span>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <Input
            placeHolder="이메일"
            type="email"
            ref={emailRef}
            onKeyDown={handleKeyDown}
          />
          <Input
            placeHolder="비밀번호"
            type="password"
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.btnContainer}>
          <CustomButton
            width={350}
            buttonType={'fill'}
            fontType={'H2'}
            text={'로그인'}
            onClick={handleLogin}
          />
          <div className={styles.find}>
            <span>이메일 찾기</span>
            <span>|</span>
            <span>비밀번호 찾기</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
