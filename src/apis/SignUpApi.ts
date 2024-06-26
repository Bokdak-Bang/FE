import { HTTP_URL } from './index';

export const postSignUp = async (
  email: string,
  username: string,
  password: string,
  checkPassword: string,
) => {
  const res = await fetch(`${HTTP_URL}/auth/sign/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
      checkPassword,
    }),
  });

  // if (!res.ok) {
  //   throw new Error('HTTP error in SignUp');
  // }

  return res.json();
};

export const postAgentSignUp = async (
  email: string,
  username: string,
  password: string,
  checkPassword: string,
  area: string,
  businessName: string,
  phoneNumber: string,
  address: string,
) => {
  const res = await fetch(`${HTTP_URL}/auth/sign/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
      checkPassword,
      area,
      businessName,
      phoneNumber,
      address,
    }),
  });

  // if (!res.ok) {
  //   throw new Error('HTTP error in AgentSignUp');
  // }

  return res.json();
};
