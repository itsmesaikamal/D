import React, { useEffect, useState } from 'react';
import { db } from './Dfirebase';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import './DCart.css';

const DCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(product => product.inDCart);
      setCartItems(items);
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, { inDCart: false });
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = async (item) => {
    const quantity = quantities[item.id] || 1;
    const totalAmount = quantity * item.price;

    await addDoc(collection(db, 'DOrders'), {
      productName: item.productName,
      price: item.price,
      quantity,
      totalAmount,
      email: "saikamal@gmail.com"
    });

    // Optionally, you might want to remove the item from the cart after placing the order
    await handleRemove(item.id);
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-left">
              <img src={item.imageUrl} alt={item.productName} className="cart-item-image" />
            </div>
            <div className="cart-item-right">
              <h3>{item.productName}</h3>
              <p>Price: ₹{Number(item.price).toFixed(2)}</p>
              <input 
                type="text"  
                value={quantities[item.id]} 
                onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
              />
              <div className="cart-item-actions">
                <button onClick={() => handlePlaceOrder(item)}>Place Order</button>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DCart;
