import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import TaskOne from 'pages/TaskOne';
import TaskTwo from 'pages/TaskTwo';
import TaskThree from 'pages/TaskThree';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <div className="tabs">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'active navlink' : 'unActive navlink'
            }
          >
            Task One
          </NavLink>
          <NavLink
            to="/TaskTwo"
            className={({ isActive }) =>
              isActive ? 'active navlink' : 'unActive navlink'
            }
          >
            Task Two
          </NavLink>
          <NavLink
            to="/TaskThree"
            className={({ isActive }) =>
              isActive ? 'active navlink' : 'unActive navlink'
            }
          >
            Task Three
          </NavLink>
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
