import React, { useEffect, useState } from 'react';
import { db } from './Dfirebase';
import { collection, getDocs } from 'firebase/firestore';
import './DMyOrders.css';

const DMyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'DOrders'));
      const ordersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <div className="orders-table">
        <div className="table-header">
          <div className="header-cell">Product Name</div>
          <div className="header-cell">Price</div>
          <div className="header-cell">Quantity</div>
          <div className="header-cell">Total Amount</div>
        </div>
        {orders.map(order => (
          <div key={order.id} className="table-row">
            <div className="table-cell">{order.productName}</div>
            <div className="table-cell">₹{Number(order.price).toFixed(2)}</div>
            <div className="table-cell">{order.quantity}</div>
            <div className="table-cell">₹{Number(order.totalAmount).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMyOrders;
