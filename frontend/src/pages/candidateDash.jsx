// src/pages/CandidDash.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CandidDash = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyResults = async () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      if (!token || !name) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/results/mine?name=${encodeURIComponent(name)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error loading results", err);
      }
    };

    fetchMyResults();
  }, [navigate]);

  return (
    <div>
      <h2>Welcome, {localStorage.getItem('name')}</h2>
      <h3>My Results</h3>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result._id}>
              Post: <strong>{result.post_name}</strong> | Score: <strong>{result.score}</strong> | Status: <strong>{result.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidDash;
