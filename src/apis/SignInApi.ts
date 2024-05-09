import { HTTP_URL } from './index';

export const postSignIn = async (email: string, password: string) => {
  const res = await fetch(`${HTTP_URL}/auth/login/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.json();
};

export const postAgentSignIn = async (email: string, password: string) => {
  const res = await fetch(`${HTTP_URL}/auth/login/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.json();
};
