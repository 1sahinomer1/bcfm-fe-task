import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LinkTab from 'components/LinkTab';

import TaskOne from 'pages/TaskOne';
import { useState } from 'react';
import { Tabs } from '@mui/material';
import TaskTwo from 'pages/TaskTwo';
import TaskThree from 'pages/TaskThree';

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <div className="tabs">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Task 1" href="/" />
            <LinkTab label="Task 2" href="/TaskTwo" />
            <LinkTab label="Task 3" href="/TaskThree" />
          </Tabs>{' '}
        </div>
        <Routes>
          <Route path="/" element={<TaskOne />} />
          <Route path="/TaskTwo" element={<TaskTwo />} />
          <Route path="/TaskThree" element={<TaskThree />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
