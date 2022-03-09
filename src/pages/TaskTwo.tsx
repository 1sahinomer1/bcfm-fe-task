import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

import AreaChart from 'components/AreaChart';

import { getCountries } from 'api/currency';
import { CovidCountry } from 'types';
import BasicTable from 'components/BasicTable';

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
    <div className="taskTwoPage">
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        {countries ? (
          <>
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
                  <MenuItem value={country.Slug} key={country.ISO2}>
                    {country.Country}
                  </MenuItem>
                ))}
            </Select>
          </>
        ) : (
          <p>loading</p>
        )}
        <BasicTable country={selectedCountry} />
        <AreaChart country={selectedCountry} />
      </FormControl>
    </div>
  );
};

export default TaskTwo;
