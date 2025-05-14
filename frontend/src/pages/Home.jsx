import { Link } from 'react-router-dom';
import '../styles.css';


export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Welcome to exam results management portal</h1>
      <p>Please choose an option below:</p>
      <Link to="/login"><button style={{ margin: '10px' }}>Login</button></Link>
      <Link to="/register"><button style={{ margin: '10px' }}>Register</button></Link>
    </div>
  );
}
