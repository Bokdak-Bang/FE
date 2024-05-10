import { HTTP_URL } from './index';

export const getMyPage = async () => {
  const type = sessionStorage.getItem('type');
  const token = sessionStorage.getItem('token');

  const headerData = type + ' ' + token;

  const res = await fetch(`${HTTP_URL}/member/my-page`, {
    method: 'GET',
    headers: {
      Authorization: headerData,
    },
  });

  return res.json();
};

export const getAgentMyPage = async () => {
  const type = sessionStorage.getItem('type');
  const token = sessionStorage.getItem('token');

  const headerData = type + ' ' + token;

  const res = await fetch(`${HTTP_URL}/agents/my-page`, {
    method: 'GET',
    headers: {
      Authorization: headerData,
    },
  });

  return res.json();
};

export const fetchMyPage = async (
  username: string,
  password: string,
  passwordCheck: string,
) => {
  const type = sessionStorage.getItem('type');
  const token = sessionStorage.getItem('token');

  const headerData = type + ' ' + token;

  const res = await fetch(`${HTTP_URL}/member/my-page`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: headerData,
    },
    body: JSON.stringify({
      username,
      password,
      passwordCheck,
    }),
  });

  // if (!res.ok) {
  //   throw new Error('HTTP error in AgentSignUp');
  // }

  return res.json();
};
