import { getLoginToken } from 'hooks/SignInHooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (!getLoginToken()) {
      // 로그인되어있지 않으면 로그인 화면으로 이동
      navigator('/signin');
    }
  }, []);
  return <div>Chat</div>;
};

export default Chat;
