import { StaticDateRangePicker } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';

const TaskTwo = () => {
  const [value, setValue] = useState<any>([null, null]);
  console.log(value);
  return (
    <div className="taskOnePage">
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
      {value[0] && value[1] !== null && (
        <p>
          {value[0]?.toISOString().slice(0, 10)}//
          {value[1]?.toISOString().slice(0, 10)}
        </p>
      )}
    </div>
  );
};

export default TaskTwo;
