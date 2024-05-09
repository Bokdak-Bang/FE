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
