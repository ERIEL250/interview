// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import AdminPosts from '../components/AdminPosts';
import CandidateList from '../components/CandidateList';
import LogoutButton from '../components/logout';
import Back from './Back';

const AdminDashboard = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Function to trigger refresh
  const triggerRefresh = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <UserList onRefresh={triggerRefresh} refreshFlag={refreshFlag} />
      <CandidateList onRefresh={triggerRefresh} refreshFlag={refreshFlag} />
      <AdminPosts onRefresh={triggerRefresh} refreshFlag={refreshFlag} />
      <LogoutButton /> <Back />
    </div>
  );
};

export default AdminDashboard;
