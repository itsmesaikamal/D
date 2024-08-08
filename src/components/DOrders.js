import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DViewOrders from './DViewOrders';
import DMyOrders from './DMyOrders';

const DOrders = () => {
  return (
    <div className="orders-content">
      <Routes>
        <Route path="reqorders" element={<DViewOrders />} />
        <Route path="myorders" element={<DMyOrders />} />
      </Routes>
    </div>
  );
};

export default DOrders;
