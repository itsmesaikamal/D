import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DViewProducts from './DViewProducts';

const DProducts = () => {
  return (
    <Routes>
      <Route path="view" element={<DViewProducts />} />
    </Routes>
  );
};

export default DProducts;
