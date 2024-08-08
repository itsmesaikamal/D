import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DMyInvoice from './DMyInvoice';
import DCustomInvoice from './DCustomInvoice';

const DInvoice = () => {
  return (
    <Routes>
      <Route path="myinvoices" element={<DMyInvoice />} />
      <Route path="customerinvoices" element={<DCustomInvoice />} />
    </Routes>
  );
};

export default DInvoice;
