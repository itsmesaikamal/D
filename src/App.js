import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DLogin from './components/DLogin';
import DHome from './components/DHome';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<DLogin />} />
        <Route path="/home/*" element={<DHome />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
