import { HTTP_URL } from './index';

export const postDataArea = async (
  natureScore: number,
  residenceScore: number,
  populationScore: number,
  securityScore: number,
  lifeScore: number,
  educationScore: number,
  welfareScore: number,
) => {
  const token = sessionStorage.getItem('token');
  const res = await fetch(`${HTTP_URL}/data/areas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      natureScore,
      residenceScore,
      populationScore,
      securityScore,
      lifeScore,
      educationScore,
      welfareScore,
    }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      console.error('Authentication failed');
    }
    throw new Error('HTTP error');
  }

  return res.json();
};
