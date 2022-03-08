import { getDailyCovid } from 'api/currency';
import { lineOptions } from '../constants/Dropdown';
import { useEffect, useState, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { DailyDateType } from 'types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type AreaProps = {
  country: string;
};

const AreaChart = ({ country }: AreaProps) => {
  const [dailyData, setDailyData] = useState<DailyDateType[]>();
  const [slice, setSlice] = useState<number>(7);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getDailyData = useCallback(async () => {
    const datas = await getDailyCovid(country);

    setDailyData(datas.reverse());
  }, [country]);

  useEffect(() => {
    getDailyData();
  }, [country, getDailyData]);

  const handleMenuItemClick = (index: number) => {
    if (index === 0) setSlice(7);
    else if (index === 1) setSlice(14);
    else setSlice(30);

    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels:
      dailyData &&
      dailyData
        ?.map((data) => dayjs(data.Date).format('DD/MM/YYYY'))
        .slice(0, slice),
    datasets: [
      {
        label: 'Vaka',
        data:
          dailyData && dailyData.map((data) => data.Confirmed).slice(0, slice),
        backgroundColor: 'rgba(18, 126, 250, 0.5)',
      },
      {
        label: 'Ölü',
        data: dailyData && dailyData.map((data) => data.Deaths).slice(0, slice),
        backgroundColor: 'rgb(133, 8, 35)',
      },
      {
        label: 'İyileşen',
        data:
          dailyData && dailyData.map((data) => data.Recovered).slice(0, slice),
        backgroundColor: 'rgba(15, 223, 15, 0.5)',
      },
    ],
  };

  return (
    <div>
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
            primary="Görüntülemek istediğin tarih aralığını buradan seçebilirsin."
            secondary={lineOptions[selectedIndex]}
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
        {lineOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Bar options={options} data={data} />
    </div>
  );
};

export default AreaChart;
