import React, { useRef } from 'react';

import styles from './SignIn.module.scss';
import { Logo150 } from 'assets';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';
import GuestHeader from 'layouts/GuestHeader';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from 'apis/SignInApi';
import { useMemberStore } from 'utils/useMemberStore';
import { getAgentMyPage } from 'apis/MyPageApi';

const index = () => {
  const sessionStorage = window.sessionStorage;
  const setMember = useMemberStore((state) => state.setMember);
  const setAgent = useMemberStore((state) => state.setAgent);

  const navigator = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // email, password로 로그인 요청 -> 토큰 return
    if (email && password) {
      postSignIn(email, password).then((res) => {
        if (res.isSuccess) {
          // 로그인 성공
          sessionStorage.setItem('token', res.data.accessToken);
          sessionStorage.setItem('type', res.data.grantType);
          sessionStorage.setItem('name', res.data.username);
          if (res.data.role === 'ROLE_USER') {
            setMember(res.data.role, res.data.username, email, password);
          } else if (res.data.role === 'ROLE_AGENT') {
            getAgentMyPage().then((res) => {
              if (res.isSuccess) {
                setAgent(
                  'ROLE_AGENT',
                  res.data.username,
                  email,
                  password,
                  res.data.area,
                  res.data.businessName,
                  res.data.phoneNumber,
                  res.data.address,
                );
              }
            });
          }
          navigator('/');
        } else {
          // 로그인 실패
          alert('로그인 실패');
        }
      });
      // getMyPage().then((res) => {
      //   if (res.isSuccess) {
      //     setAgent(
      //       res.data.username,
      //       email,
      //       password,
      //       res.data.area,
      //       res.data.businessName,
      //       res.data.phoneNumber,
      //       res.data.address,
      //     );
      //   }
      // });
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
