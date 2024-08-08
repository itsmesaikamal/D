import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import DNavbar from './DNavbar';
import DProducts from './DProducts';
import DOrders from './DOrders';
import DInvoice from './DInvoice';
import DMyInvoice from './DMyInvoice';
import DCustomInvoice from './DCustomInvoice';
import DAccounts from './DAccounts';
import DCart from './DCart'; // Import DCart component
import { db } from './Dfirebase';
import { collection, getDocs } from 'firebase/firestore';
import './DHome.css';

const DHome = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const cartItems = querySnapshot.docs.filter(doc => doc.data().inCart);
      setCartCount(cartItems.length);
    };

    fetchCartCount();
  }, []);

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="home-container">
      <DNavbar />
      <div className="main-content">
        <div className="top-bar">
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            className="cart-icon" 
            onClick={() => navigate('/home/cart')} // Handle navigation to cart
          />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
        <Routes>
          <Route path="products/*" element={<DProducts onAddToCart={handleAddToCart} />} />
          <Route path="orders/*" element={<DOrders />} />
          <Route path="invoice/*" element={<DInvoice />} />
          <Route path="accounts" element={<DAccounts />} />
          <Route path="cart" element={<DCart />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default DHome;
