import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import CandidDash from './pages/candidateDash';
import './styles.css';

import UserList from './components/UserList';  // Importing the UserList component


//import AddDriver from './pages/admin/AddDriver';  // Importing AddDriver page
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for Admin */}
        <Route
          path="/admin"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />
       
       
        {/* Protected Routes for Candidate */}
        <Route
          path="/candidate"
          element={<ProtectedRoute role="candidate"><CandidDash /></ProtectedRoute>}
        />

        {/* Protected Routes for Driver */}
        
      </Routes>
    </Router>
  );
}

export default App;
