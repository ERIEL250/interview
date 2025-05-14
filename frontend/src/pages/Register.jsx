import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Back from './Back';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/register', form); // Replace with your backend URL
      navigate('/login');
    } catch (err) {
      setError('Registration failed!');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="customer">candidate</option>
          
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form> <Back/>
    </div>
  );
}
