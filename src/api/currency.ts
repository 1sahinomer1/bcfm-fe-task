import axios from 'axios';
import { GetCurrency } from 'types';

const BASEURL = 'http://data.fixer.io/api/';
const API_KEY = '3002996d3dab4d96861ca991842b6023';

export const getData = async () => {
  const res = await axios.get<GetCurrency>(
    `${BASEURL}latest?access_key=${API_KEY}&format=1`
  );
  const data = res.data;
  return data;
};
export const getDateData = async (date: string | undefined) => {
  const res = await axios.get<GetCurrency>(
    `${BASEURL}${date}?access_key=${API_KEY}`
  );
  const data = res.data;
  return data;
};
