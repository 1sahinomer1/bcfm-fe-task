import { getData, getDateData } from 'api/currency';
import { useCallback, useEffect, useState } from 'react';
import { GetCurrency } from 'types';

import { DatePicker } from '@mui/lab';
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
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
import { options } from 'constants/Dropdown';

import dayjs from 'dayjs';

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
  const [data, setData] = useState<GetCurrency>();
  const [yesterdayData, setYesterdayData] = useState<GetCurrency>();
  const [currentMoney, setCurrentMoney] = useState<string | undefined>();
  const [yesterdayCurrentMoney, setYesterdayCurrentMoney] = useState<
    string | undefined
  >();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (index === 0) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.USD).toFixed(2));
      yesterdayData &&
        setYesterdayCurrentMoney(
          (yesterdayData?.rates.TRY / yesterdayData?.rates.USD).toFixed(2)
        );
    } else if (index === 1) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.GBP).toFixed(2));
      yesterdayData &&
        setYesterdayCurrentMoney(
          (yesterdayData?.rates.TRY / yesterdayData?.rates.GBP).toFixed(2)
        );
    } else if (index === 2) {
      setCurrentMoney(data?.rates.TRY?.toFixed(2));
      yesterdayData &&
        setYesterdayCurrentMoney((yesterdayData?.rates.TRY).toFixed(2));
    } else if (index === 3) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.CAD).toFixed(2));
      yesterdayData &&
        setYesterdayCurrentMoney(
          (yesterdayData?.rates.TRY / yesterdayData?.rates.CAD).toFixed(2)
        );
    } else if (index === 4) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.JPY).toFixed(2));
      yesterdayData &&
        setYesterdayCurrentMoney(
          (yesterdayData?.rates.TRY / yesterdayData?.rates.JPY).toFixed(2)
        );
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getDataCurrency = useCallback(async () => {
    const datas = await getData();
    setData(datas);
    const yesterdayDatas = await getDateData(
      dayjs(selectedDate).subtract(1, 'd').format('YYYY-MM-DD')
    );
    setYesterdayData(yesterdayDatas);
  }, []);

  const getDateCurrency = useCallback(async () => {
    const datas = await getDateData(dayjs(selectedDate).format('YYYY-MM-DD'));
    setData(datas);
    const yesterDayDatas = await getDateData(
      dayjs(selectedDate).subtract(1, 'd').format('YYYY-MM-DD')
    );
    setYesterdayData(yesterDayDatas);
  }, [selectedDate]);

  useEffect(() => {
    getDataCurrency();
  }, []);

  useEffect(() => {
    selectedDate && getDateCurrency();
  }, [getDateCurrency, selectedDate]);

  const LineOption = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels = [
    dayjs(selectedDate).subtract(1, 'd').format('YYYY-MM-DD'),
    dayjs(selectedDate).format('YYYY-MM-DD'),
  ];
  const LineData = {
    labels,
    datasets: [
      {
        label: 'Dolar  1',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data:
          data &&
          labels.map(() => (data?.rates.TRY / data?.rates.USD).toFixed(2)),
      },
      {
        label: 'Dolar 2',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data:
          yesterdayData &&
          labels.map(() =>
            (yesterdayData?.rates.TRY / yesterdayData?.rates.USD).toFixed(2)
          ),
      },
    ],
  };
  return (
    <div className="taskOnePage">
      <DatePicker
        label="Select date"
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue);
        }}
        maxDate={new Date()}
        renderInput={(params) => <TextField {...params} />}
      />
      <List component="nav" sx={{ bgcolor: 'background.paper' }}>
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Para birimini buradan değiştirebilirsin."
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option: string, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event: any) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {data && !currentMoney ? (
        <p className="currentTl">
          data money :{(data?.rates.TRY / data?.rates.USD).toFixed(2)}₺ date:
          {data.date}
        </p>
      ) : (
        <p className="currentTl"> current money :{currentMoney}₺</p>
      )}
      {yesterdayData && !yesterdayCurrentMoney ? (
        <p className="currentTl">
          yesterday data money :{' '}
          {(yesterdayData?.rates.TRY / yesterdayData?.rates.USD).toFixed(2)}₺
          date:{yesterdayData.date}
        </p>
      ) : (
        <p className="currentTl">
          yesterday current money :{yesterdayCurrentMoney}₺
        </p>
      )}
      {/* <Line options={LineOption} data={LineData} />; */}
    </div>
  );
};

export default TaskOne;
