import { HTTP_URL } from './index';

export const getAreaBoards = async (areaId: string) => {
  const res = await fetch(`${HTTP_URL}/data/areas/${areaId}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      console.error('Authentication failed');
    }
    throw new Error('HTTP error');
  }

  return res.json();
};

export const saveUserArea = async (areaId: string) => {
  const token = sessionStorage.getItem('token');
  const res = await fetch(`${HTTP_URL}/data/${areaId}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ areaId }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      console.error('Authentication failed');
    }
    throw new Error('HTTP error');
  }

  return res.json();
};

export const getUserAreas = async () => {
  const token = sessionStorage.getItem('token');
  const res = await fetch(`${HTTP_URL}/data/boards`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      console.error('Authentication failed');
    }
    throw new Error('HTTP error');
  }

  return res.json();
};
