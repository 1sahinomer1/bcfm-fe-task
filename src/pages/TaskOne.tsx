import { getData, getDateData } from 'api/currency';
import { useEffect, useState } from 'react';
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
import { options } from 'constants/Dropdown';

const TaskOne = () => {
  const [data, setData] = useState<GetCurrency>();
  const [currentMoney, setCurrentMoney] = useState<any>();
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
    } else if (index === 1) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.GBP).toFixed(2));
    } else if (index === 2) {
      setCurrentMoney(data?.rates.TRY?.toFixed(2));
    } else if (index === 3) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.CAD).toFixed(2));
    } else if (index === 4) {
      data && setCurrentMoney((data?.rates.TRY / data?.rates.JPY).toFixed(2));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getDataCurrency = async () => {
      const datas = await getData();
      setData(datas);
    };
    getDataCurrency();
  }, []);

  useEffect(() => {
    let formatDate = selectedDate?.toISOString().slice(0, 10);
    const getDateCurrency = async () => {
      const datas = await getDateData(formatDate);
      setData(datas);
    };
    selectedDate && getDateCurrency();
    data && setCurrentMoney((data?.rates.TRY / data?.rates.USD).toFixed(2));
  }, [selectedDate]);

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

      {currentMoney ? (
        <p className="currentTl">{currentMoney}₺</p>
      ) : (
        <p className="currentTl">
          {data && (data?.rates.TRY / data?.rates.USD).toFixed(2)}₺
        </p>
      )}
    </div>
  );
};

export default TaskOne;
