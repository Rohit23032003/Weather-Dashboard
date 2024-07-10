// UserMenu.js
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, Avatar, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from './Auth';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem>
          <Typography variant="body1">{user.email}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">{user.username}</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
