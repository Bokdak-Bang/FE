/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './MyPage.module.scss';
import Input from 'components/common/Input';
import CustomButton from 'components/common/Button';
import { getLoginToken } from 'hooks/SignInHooks';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from 'utils/useMemberStore';
import { fetchMyPage } from 'apis/MyPageApi';

const index = () => {
  const navigator = useNavigate();
  const getMember = useMemberStore((state) => state.getMember);
  // const getAgent = useMemberStore((state) => state.getAgent);

  // const setMember = useMemberStore((state) => state.setMember);
  // const setAgent = useMemberStore((state) => state.setAgent);

  const [userName, setUserName] = useState<string>(getMember().name);
  const [email, setEmail] = useState<string>(getMember().email);
  const [password, setPassword] = useState<string>(getMember().password);

  const name_get = getMember().name;
  const email_get = getMember().email;
  const password_get = getMember().password;

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
    const password = passwordRef.current?.value;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const passwordCheck = passwordCheckRef.current?.value;

    if (password !== passwordCheck) {
      alert('비밀번호를 확인해주세요!');
    } else {
      setUserName(name || '');
      setPassword(password || '');
      if (name && password) {
        fetchMyPage(name, password!, password!).then((res) => {
          if (res.isSuccess) {
            alert('정보가 수정되었습니다.');
            sessionStorage.setItem('name', name);
          } else {
            alert('정보 수정에 실패했습니다.');
          }
        });
      } else {
        alert('이름과 비밀번호를 입력해주세요.');
      }
    }
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
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

  useEffect(() => {
    if (!getLoginToken()) {
      // 로그인되어있지 않으면 로그인 화면으로 이동
      navigator('/signin');
    }
  }, []);

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
            value={name_get}
            ref={nameRef}
          />
          <Input
            isModifying={true}
            type="email"
            placeHolder="이메일"
            value={email_get}
            ref={emailRef}
          />
          <Input
            isModifying={true}
            type="password"
            placeHolder="비밀번호"
            value={password_get}
            ref={passwordRef}
          />
          <Input
            isModifying={true}
            type="password"
            placeHolder="비밀번호 확인"
            value={password_get}
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
