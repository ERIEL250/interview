import React from 'react';
import { useNavigate } from 'react-router-dom';

const back = () => {
  const navigate = useNavigate();

  const back= () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <button onClick={back} style={{ margin: '10px', padding: '6px 12px' }}>
      back to home
    </button>
  );
};

export default back;
