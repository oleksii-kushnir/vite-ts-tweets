import axios from 'axios';
import type { ITweet } from '@/types/types';

const BASE_URL = 'https://643884021b9a7dd5c952ae92.mockapi.io/api/v1/tweets';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosApiServiceGet = async (page: number, signal: AbortSignal) => {
  const url = `?page=${page}&limit=3`;
  const response = await axiosInstance.get(url, { signal });
  return response.data;
};

export const axiosApiServicePut = async ({
  user,
  tweets,
  followers,
  avatar,
  id,
}: ITweet) => {
  const url = `/${id}`;
  const response = await axiosInstance.put(url, {
    user,
    tweets,
    followers,
    avatar,
    id,
  });
  return response.data;
};
