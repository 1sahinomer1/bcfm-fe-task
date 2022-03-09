import { useState, useCallback, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import Loading from 'components/Loading';

import { cryptoCurrency, cryptoDays } from 'constants/Dropdown';
import { getHistoricalChart } from 'api/currency';
import { chartCoin } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const TaskOne = () => {
  const [historicalData, setHistoricalData] = useState<chartCoin>();
  const [days, setDays] = useState(1);
  const [value, setValue] = useState<string | number>(1);
  const [openDate, setOpenDate] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [currency, setCurrency] = useState('TRY');

  const fetchHistoricalData = useCallback(async () => {
    const datas = await getHistoricalChart('bitcoin', days, currency);
    setHistoricalData(datas);
  }, [currency, days]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  let lineData = {
    labels:
      historicalData &&
      historicalData.prices.map((coin: number[]) =>
        dayjs(coin[0]).format('DD/MM/YYYY')
      ),
    datasets: [
      {
        data:
          historicalData &&
          historicalData.prices.map((coin: number[]) => coin[1]),
        label: `Para grafiği`,
        borderColor: 'gray',
      },
    ],
  };
  let lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bitcoin Çizgi Grafiği',
      },
      maintainAspectRatio: false,
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    setValue(event.target.value);
  };

  const dateHandleClose = () => {
    setOpenDate(false);
  };

  const dateHandleOpen = () => {
    setOpenDate(true);
  };
  const handleCurrencyChange = (event: SelectChangeEvent<typeof currency>) => {
    setCurrency(event.target.value);
  };

  const currencyHandleClose = () => {
    setOpenCurrency(false);
  };

  const currencyHandleOpen = () => {
    setOpenCurrency(true);
  };

  return (
    <div className="taskOnePage">
      <div className="formGroup">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Tarih Aralığı
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openDate}
            onClose={dateHandleClose}
            onOpen={dateHandleOpen}
            value={value}
            label="Tarih Aralığı"
            onChange={handleChange}
          >
            {cryptoDays.map((days) => {
              return (
                <MenuItem
                  value={days.value}
                  key={days.value}
                  onClick={() => setDays(days.value)}
                >
                  {days.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>{' '}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Para Birimi
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openCurrency}
            onClose={currencyHandleClose}
            onOpen={currencyHandleOpen}
            value={currency}
            label="Para Birimi"
            onChange={handleCurrencyChange}
          >
            {cryptoCurrency.map((currency) => {
              return (
                <MenuItem
                  value={currency.value}
                  key={currency.value}
                  onClick={() => setCurrency(currency.value)}
                >
                  {currency.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>{' '}
      </div>
      {historicalData ? (
        <Line data={lineData} options={lineOptions} width={400} height={130} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TaskOne;
