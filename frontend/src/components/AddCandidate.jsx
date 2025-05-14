// src/components/AddCandidate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCandidate = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          axios.get('http://localhost:5000/users', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/posts', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/candidates', {
        userId: selectedUser,
        postId: selectedPost
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Candidate successfully added!');
    } catch (err) {
      console.error('Error adding candidate:', err);
      setMessage('Failed to add candidate.');
    }
  };

  return (
    <div>
      <h3>Add Candidate</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Select User:
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">-- Select a User --</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Select Post:
          <select value={selectedPost} onChange={(e) => setSelectedPost(e.target.value)} required>
            <option value="">-- Select a Post --</option>
            {posts.map(post => (
              <option key={post._id} value={post._id}>
                {post.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
};

export default AddCandidate;
