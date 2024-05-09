import React, { useRef, useState } from 'react';
import styles from './SignUp.module.scss';
import GuestHeader from 'layouts/GuestHeader';
import { Logo150 } from 'assets';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';
import { postSignUp } from 'apis/SignUpApi';

const index = () => {
  const { state } = useLocation();
  const { isUser } = state;
  const navigator = useNavigate();

  const [isSecondPage, setIsSecondPage] = useState<boolean>(false);
  const [isThirdPage, setIsThirdPage] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  // 공인중개사의 경우
  const regionRef = useRef<HTMLInputElement>(null);
  const estateNameRef = useRef<HTMLInputElement>(null);
  const callNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const handleMemberSignUp = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;

    if (name && email && password && passwordCheck) {
      postSignUp(email, name, password, passwordCheck).then((res) => {
        if (res.isSuccess) {
          navigator('/signin');
        } else if (res.code === 'MEMBER_002') {
          alert('동일한 이메일을 가지는 사용자가 존재합니다!');
        } else {
          alert('회원가입 실패');
        }
      });
    }
  };

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
          {!isSecondPage && !isThirdPage ? (
            <>
              <Input type="text" placeHolder="이름" ref={nameRef} />
              <Input type="email" placeHolder="이메일" ref={emailRef} />
              <Input type="password" placeHolder="비밀번호" ref={passwordRef} />
              <Input
                type="password"
                placeHolder="비밀번호 확인"
                ref={passwordCheckRef}
              />
            </>
          ) : isSecondPage ? (
            <>
              <Input type="text" placeHolder="담당 행정구" ref={regionRef} />
              <Input type="text" placeHolder="상호명" ref={estateNameRef} />
              <Input type="tel" placeHolder="전화번호" ref={callNumberRef} />
              <Input type="text" placeHolder="주소" ref={addressRef} />
            </>
          ) : (
            <>
              <div>공인중개사 이미지</div>
            </>
          )}
        </div>
        <div className={styles.btnContainer}>
          <CustomButton
            width={129}
            buttonType={'empty'}
            fontType={'H2'}
            text={'이전'}
            onClick={
              isUser
                ? () => navigator(-1) // 사용자
                : !isSecondPage && !isThirdPage
                  ? () => navigator('/signup') // 공인중개사 step 1
                  : !isThirdPage
                    ? () => setIsSecondPage(false) // 공인중개사 step 2
                    : () => {
                        setIsSecondPage(true);
                        setIsThirdPage(false);
                      } // 공인중개사 step 3
            }
          />
          <CustomButton
            width={213}
            buttonType={'fill'}
            fontType={'H2'}
            text={isUser || isThirdPage ? '가입하기' : '다음'}
            onClick={
              isUser
                ? handleMemberSignUp // 사용자
                : !isSecondPage && !isThirdPage
                  ? () => setIsSecondPage(true) // 공인중개사 step 1
                  : !isThirdPage
                    ? () => {
                        // 공인중개사 step 2
                        setIsThirdPage(true);
                        setIsSecondPage(false);
                      }
                    : () => console.log('공인중개사 가입') // 공인중개사 step 3
            }
          />
        </div>
      </div>
    </>
  );
};

export default index;
