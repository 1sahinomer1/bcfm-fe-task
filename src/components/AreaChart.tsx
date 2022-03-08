import { getDailyCovid } from 'api/currency';
import { lineOptions } from 'constants/Dropdown';
import { useEffect, useState, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DailyDateType } from 'types';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
type AreaProps = {
  country: string;
};

const AreaChart = ({ country }: AreaProps) => {
  const [dailyData, setDailyData] = useState<DailyDateType[]>();
  const [x, setX] = useState<DailyDateType[]>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getDailyData = useCallback(async () => {
    const datas = await getDailyCovid(country);
    setDailyData(datas);
  }, [country]);

  useEffect(() => {
    // getDailyData();
  }, [country, getDailyData]);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const series = [
    {
      name: 'Vaka',
      data: dailyData?.map((item) => item.Confirmed),
    },
    {
      name: 'İyileşen',
      data: dailyData?.map((item) => item.Recovered),
    },
    {
      name: 'Ölüm',
      data: dailyData?.map((item) => item.Deaths),
    },
  ];
  const options = {
    chart: {
      id: 'simple-bar',
    },
    plotOptions: {
      bar: { columnWidth: '100%', barHeight: '100%' },
    },
    xaxis: {
      categories: dailyData?.slice(0, 10).map((data) => {
        let currentDate = new Date(data.Date);
        return currentDate.toISOString().slice(0, 10);
      }),
    },
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
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {dailyData ? (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default AreaChart;
