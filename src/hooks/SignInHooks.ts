import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from 'seohyun-apis/SignInApi';

// 로그인 세션 저장
export const setLoginSession = (email: string, password: string): boolean => {
  const sessionStorage = window.sessionStorage;

  // email, password로 로그인 요청 -> 토큰 return
  postSignIn(email, password).then((res) => {
    if (res.isSuccess) {
      sessionStorage.setItem('token', res.data.accessToken);
      return true;
    } else {
      return false;
    }
  });

  return false;
};

// 토큰 가져오기
export const getLoginToken = () => {
  const sessionStorage = window.sessionStorage;

  const userToken = sessionStorage.getItem('token');
  if (userToken) {
    return userToken;
  } else {
    return false;
  }
};
