import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ margin: '10px', padding: '6px 12px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
