import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.scss';
import GuestHeader from 'layouts/GuestHeader';
import { AddImg, Logo150 } from 'assets';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';
import { postSignUp } from 'apis/SignUpApi';

const index = () => {
  const { state } = useLocation();
  const { isUser } = state;
  const navigator = useNavigate();
  const [currentImg, setCurrentImg] = useState<string>();

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
  const imgRef = useRef<HTMLInputElement>(null);

  const handleMemberSignUp = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;

    // if (name && email && password && passwordCheck) {
    //   postSignUp(email, name, password, passwordCheck).then((res) => {
    //     if (res.isSuccess) {
    //       navigator('/signin');
    //     } else if (res.code === 'MEMBER_002') {
    //       alert('동일한 이메일을 가지는 사용자가 존재합니다!');
    //     } else {
    //       alert('회원가입 실패');
    //     }
    //   });
    // }
  };

  // useEffect(() => {}, [isSecondPage, isThirdPage]);

  const handleAgentSignUp = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;
    const region = regionRef.current?.value;
    const estateName = estateNameRef.current?.value;
    const callNumber = callNumberRef.current?.value;
    const address = addressRef.current?.value;

    if (
      name &&
      email &&
      password &&
      passwordCheck &&
      region &&
      estateName &&
      callNumber &&
      address
    ) {
      if (password !== passwordCheck) {
        alert('비밀번호를 다시 확인해주세요!');
      } else {
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
    }
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target!.files;
    if (files) {
      const newImg: File = files[0];
      // 이미지 파일 유효성 검사
      if (!isImageFile(newImg)) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      setCurrentImg(URL.createObjectURL(newImg));
    }
  };

  const isImageFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
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
              <Input
                type="text"
                placeHolder="담당 행정구"
                ref={regionRef}
                value=""
              />
              <Input type="text" placeHolder="상호명" ref={estateNameRef} />
              <Input type="tel" placeHolder="전화번호" ref={callNumberRef} />
              <Input type="text" placeHolder="주소" ref={addressRef} />
            </>
          ) : (
            <div className={styles.imgContainer}>
              <div className={styles.title}>공인중개사 증명</div>
              <div className={styles.label}>
                부동산중개업 등록증 또는 사업자등록증을 업로드해 주세요.
              </div>
              {currentImg ? (
                <img src={currentImg} className={styles.changedImg} />
              ) : (
                <label>
                  <input
                    type="file"
                    ref={imgRef}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={handleChangeImg}
                  />
                  <AddImg />
                </label>
              )}
            </div>
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
                        if (
                          passwordRef.current!.value !==
                          passwordCheckRef.current!.value
                        ) {
                          alert('비밀번호를 다시 확인해주세요!');
                        }
                        regionRef.current!.value = '';
                        callNumberRef.current!.value = '';
                        addressRef.current!.value = '';
                        estateNameRef.current!.value = '';
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
