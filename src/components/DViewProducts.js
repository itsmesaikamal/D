import React, { useEffect, useState } from 'react';
import { db } from './Dfirebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import './DViewProducts.css';

const DViewProducts = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const productRef = doc(db, 'products', product.id);
    await updateDoc(productRef, { inDCart: true });

    // Optionally update local state to reflect changes immediately
    setProducts(products.map(p => p.id === product.id ? { ...p, inDCart: true } : p));
    if (typeof onAddToCart === 'function') {
      onAddToCart(); // Call the parent component function to update the cart count
    }
  };

  return (
    <div className="view-products">
      <h2>View Products</h2>
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.productName} className="product-image" />
            <div className="product-details">
              <h3>{product.productName}</h3>
              <p>Price: ₹{Number(product.price).toFixed(2)}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DViewProducts.defaultProps = {
  onAddToCart: () => {}
};

DViewProducts.propTypes = {
  onAddToCart: PropTypes.func
};

export default DViewProducts;
