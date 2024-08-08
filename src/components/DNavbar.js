import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import './DNavbar.css';

const drawerWidth = 240;

const DNavbar = () => {
  const location = useLocation();

  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    backgroundImage: `url('https://images.pexels.com/photos/3772353/pexels-photo-3772353.jpeg?auto=compress&cs=tinysrgb&w=600')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    fontFamily: 'Cursive, Arial, sans-serif',
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: drawerStyle,
      }}
    >
      <div className="navbar-container">
        <div className="admin-logo">District Admin</div>
        <List>
          <ListItem button component={Link} to="/home/products">
            <ListItemText primary="Products" />
          </ListItem>
          {location.pathname.includes('/home/products') && (
            <div className="sub-nav">
              <ListItem button component={Link} to="/home/products/view">
                <ListItemText primary="View Products" />
              </ListItem>
            </div>
          )}
          <ListItem button component={Link} to="/home/orders">
            <ListItemText primary="Orders" />
          </ListItem>
          {location.pathname.includes('/home/orders') && (
            <div className="sub-nav">
              <ListItem button component={Link} to="/home/orders/reqorders">
                <ListItemText primary="Customer Orders" />
              </ListItem>
              <ListItem button component={Link} to="/home/orders/myorders">
                <ListItemText primary="My Orders" />
              </ListItem>
            </div>
          )}
          <ListItem button component={Link} to="/home/invoice">
            <ListItemText primary="Invoice" />
          </ListItem>
          {location.pathname.includes('/home/invoice') && (
            <div className="sub-nav">
              <ListItem button component={Link} to="/home/invoice/myinvoices">
                <ListItemText primary="My Invoices" />
              </ListItem>
              <ListItem button component={Link} to="/home/invoice/customerinvoices">
                <ListItemText primary="Customer Invoices" />
              </ListItem>
            </div>
          )}
          <ListItem button component={Link} to="/home/accounts">
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button component={Link} to="/home/logout">
            <ListItemText primary="LogOut" />
          </ListItem>
        </List>
        <Divider />
        
        <IconButton
          component={Link}
          to="/cart"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '10px',
          }}
        >
          <ShoppingCartIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </Drawer>
  );
};

export default DNavbar;
