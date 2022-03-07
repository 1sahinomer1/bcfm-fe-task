import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

import Chart from 'components/AreaChart';

import { getCountries } from 'api/currency';
import { CovidCountry } from 'types';

const TaskTwo = () => {
  const [countries, setCountries] = useState<CovidCountry[]>();
  const [selectedCountry, setSelectedCountry] = useState('turkey');

  useEffect(() => {
    const getDataCurrency = async () => {
      const datas = await getCountries();
      setCountries(datas);
    };
    getDataCurrency();
  }, []);

  const handleChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <div className="taskOnePage">
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCountry}
          label="Country"
          onChange={handleChange}
        >
          {countries &&
            countries.map((country) => (
              <MenuItem value={country.Slug}>{country.Country}</MenuItem>
            ))}
        </Select>
        <Chart country={selectedCountry} />
      </FormControl>
    </div>
  );
};

export default TaskTwo;
