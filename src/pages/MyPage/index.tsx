import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './MyPage.module.scss';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';

const index = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const [currentImg, setCurrentImg] = useState<string>(
    'images/profile-default.svg',
  );

  const handleSave = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;

    console.log('name: ', name, ', email: ', email, ', password: ', password);
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
    <div className={styles.container}>
      <div className={styles.title}>마이페이지</div>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img src={currentImg} alt="" className={styles.img} />
          <label>
            <input
              type="file"
              ref={imgRef}
              accept=".jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={handleChangeImg}
            />
            <div className={styles.imgBtn}>사진 업로드</div>
          </label>
        </div>
        <div className={styles.inputSection}>
          <Input
            isModifying={true}
            type="text"
            placeHolder="이름"
            value="홍길동"
            ref={nameRef}
          />
          <Input
            isModifying={true}
            type="email"
            placeHolder="이메일"
            value="naver@naver"
            ref={emailRef}
          />
          <Input
            isModifying={true}
            type="password"
            placeHolder="비밀번호"
            value="12345678"
            ref={passwordRef}
          />
          <Input
            isModifying={true}
            type="password"
            placeHolder="비밀번호 확인"
            value="12345678"
            ref={passwordCheckRef}
          />
        </div>
        <CustomButton
          width={350}
          buttonType={'fill'}
          fontType={'H2'}
          text={'정보 수정하기'}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default index;
