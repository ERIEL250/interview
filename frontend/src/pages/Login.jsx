import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useState } from 'react';
import Back from './Back';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // Function to handle login
 
    
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const { token, user } = await loginUser(email, password);
  
      // Store necessary details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.name); // ✅ Store user ID for future use (as customerId)
  
      // Navigate based on role
      if (user.role === 'admin') navigate('/admin');
      else navigate('/candidate');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button> 
      </form> 
      {error && <p style={{ color: 'red' }}>{error}</p>}  <Back/>
    </div>
  );
}
