import React, { useRef } from 'react';
import styles from './SignUp.module.scss';
import GuestHeader from 'layouts/GuestHeader';
import { Logo150 } from 'assets';
import { useNavigate } from 'react-router-dom';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';

const index = () => {
  const navigator = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

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
        <div className={styles.inputContainer}>
          <Input type="text" placeHolder="이름" ref={nameRef} />
          <Input type="email" placeHolder="이메일" ref={emailRef} />
          <Input type="password" placeHolder="비밀번호" ref={passwordRef} />
          <Input
            type="password"
            placeHolder="비밀번호 확인"
            ref={passwordCheckRef}
          />
        </div>
        <div className={styles.btnContainer}>
          <CustomButton
            width={129}
            buttonType={'empty'}
            fontType={'H2'}
            text={'이전'}
          />
          <CustomButton
            width={213}
            buttonType={'fill'}
            fontType={'H2'}
            text={'가입하기'}
          />
        </div>
      </div>
    </>
  );
};

export default index;
