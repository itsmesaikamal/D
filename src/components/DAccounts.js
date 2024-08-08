import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Dfirebase'; // Ensure you have the Firebase setup
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './DAccounts.css';

const Accounts = () => {
  const [expenses, setExpenses] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [factoryInvoiceCount, setFactoryInvoiceCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const factoryInvoiceSnapshot = await getDocs(collection(db, 'factory-invoice'));
      const ordersSnapshot = await getDocs(collection(db, 'MOrders'));

      const factoryInvoiceData = factoryInvoiceSnapshot.docs.map(doc => doc.data());
      const ordersData = ordersSnapshot.docs.map(doc => doc.data());

      setFactoryInvoiceCount(factoryInvoiceSnapshot.size);
      setOrdersCount(ordersSnapshot.size);

      const totalExpenses = factoryInvoiceData.reduce((sum, item) => sum + parseFloat(item.total), 0);
      const totalEarnings = ordersData.reduce((sum, item) => sum + item.totalAmount, 0);
      const totalProfitOrLoss = totalEarnings - totalExpenses;

      setExpenses(totalExpenses);
      setEarnings(totalEarnings);
      setProfitOrLoss(totalProfitOrLoss);
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Expenses', value: expenses },
    { name: 'Earnings', value: earnings },
    { name: 'Profit/Loss', value: profitOrLoss },
  ];

  const COLORS = ['#FF8042', '#0088FE', '#00C49F'];

  return (
    <div className="accounts-container">
      <div className="cards-container">
        <div className="card factory-invoice-card">
          <h3>My Orders</h3>
          <p>{factoryInvoiceCount}</p>
        </div>
        <div className="card orders-card">
          <h3> Customer Orders</h3>
          <p>{ordersCount}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Accounts;
