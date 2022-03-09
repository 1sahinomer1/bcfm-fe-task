export interface CovidCountry {
  Country: string;
  Slug: string;
  ISO2: string;
}
export interface DailyDateType {
  ID: string;
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
}
export interface chartCoin {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}
