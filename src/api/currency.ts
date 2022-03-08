import axios from 'axios';
import { CovidCountry, DailyDateType, GetCurrency } from 'types';

const BASEURL = 'http://data.fixer.io/api/';
const API_KEY = 'b58f1052201d107b037c844af25ab052';
const COVIDBASE = 'https://api.covid19api.com';

export const getData = async () => {
  const { data } = await axios.get<GetCurrency>(
    `${BASEURL}latest?access_key=${API_KEY}&format=1`
  );
  return data;
};
export const getDateData = async (date: string | undefined) => {
  const { data } = await axios.get<GetCurrency>(
    `${BASEURL}${date}?access_key=${API_KEY}`
  );
  return data;
};

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
