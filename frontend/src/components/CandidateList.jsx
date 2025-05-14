import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [scores, setScores] = useState({});
  const [editData, setEditData] = useState({});

  const token = localStorage.getItem('token');

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/candidates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCandidates(res.data);
    } catch (err) {
      console.error('Failed to fetch candidates:', err);
    }
  };

  // Fetch all results
  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:5000/results', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(res.data);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  };

  // Create result
  const generateReport = async (candidateId) => {
    const score = scores[candidateId];
    if (!score) return alert('Please enter a score first.');

    try {
      await axios.post(
        'http://localhost:5000/results',
        { candidate_id: candidateId, score },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchResults(); // Refresh results after generating
    } catch (err) {
      console.error('Failed to generate result:', err);
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/candidates/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCandidates();
      fetchResults(); // Refresh in case related result is also deleted
    } catch (err) {
      console.error('Failed to delete candidate:', err);
    }
  };

  // Delete result
  const deleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchResults();
    } catch (err) {
      console.error('Failed to delete result:', err);
    }
  };

  // Update result
  const updateResult = async (id) => {
    const data = editData[id];
    if (!data) return;

    try {
      await axios.put(
        `http://localhost:5000/results/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchResults();
    } catch (err) {
      console.error('Failed to update result:', err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchResults();
  }, []);

  return (
    <div>
      <h3>Candidates List</h3>
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            names: <strong>{c.name}</strong> -phone: <strong>{c.phone}</strong> -email:  ({c.email}) - Post: <em>{c.post_name}</em>
            <button onClick={() => deleteCandidate(c._id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
            <br />
            <input
              type="number"
              placeholder="Enter score"
              value={scores[c._id] || ''}
              onChange={(e) =>
                setScores((prev) => ({ ...prev, [c._id]: e.target.value }))
              }
            />
            <button onClick={() => generateReport(c._id)}>Generate Report</button>
          </li>
        ))}
      </ul>

      <h3>Results</h3>
      <ul>
        {results.map((r) => (
          <li key={r._id}>
            -names: {r.candidate_name} - Post: {r.post_name} | Score: {r.score} | Status: <strong>{r.status}</strong>
            <br />
            <input
              type="number"
              placeholder="Edit score"
              value={editData[r._id]?.score ?? ''}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  [r._id]: { ...prev[r._id], score: e.target.value }
                }))
              }
            />
            <button onClick={() => updateResult(r._id)} style={{ marginLeft: '5px' }}>
              Edit Marks
            </button>
            <button onClick={() => deleteResult(r._id)} style={{ marginLeft: '10px', color: 'red' }}>
              Delete Result
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
