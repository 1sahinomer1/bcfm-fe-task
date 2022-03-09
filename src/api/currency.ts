import axios from 'axios';
import { chartCoin, CovidCountry, DailyDateType } from 'types';

const COVIDBASE = 'https://api.covid19api.com';
const COINBASE = 'https://api.coingecko.com/api/v3/coins';

export const getCountries = async () => {
  const { data } = await axios.get<CovidCountry[]>(`${COVIDBASE}/countries`);
  return data;
};
export const getDailyCovid = async (country: string) => {
  const { data } = await axios.get<DailyDateType[]>(
    `${COVIDBASE}/dayone/country/${country}`
  );
  return data;
};

export const getHistoricalChart = async (
  id: string,
  days = 365,
  currency: string
) => {
  const { data } = await axios.get<chartCoin>(
    `${COINBASE}/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  return data;
};
