import { postSignIn } from 'apis/SignInApi';
import { useMemberStore } from 'utils/useMemberStore';

// 로그인 후 세션에 토큰 저장 및 전역으로 사용자 정보 저장
export const setLoginSession = (email: string, password: string): boolean => {
  const sessionStorage = window.sessionStorage;
  const setMember = useMemberStore((state) => state.setMember);

  // email, password로 로그인 요청 -> 토큰 return
  postSignIn(email, password).then((res) => {
    if (res.isSuccess) {
      sessionStorage.setItem('token', res.data.accessToken);
      setMember(res.data.name, email, password);
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
