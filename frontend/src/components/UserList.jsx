// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [candidatePost, setCandidatePost] = useState({});

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleMakeCandidate = async (e, user) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = candidatePost[user._id];

    if (!formData || !formData.postId || !formData.phone) {
      alert('Please select a post and enter phone number.');
      return;
    }

    const selectedPost = posts.find((post) => post._id === formData.postId);

    const candidateData = {
      name: user.name,
      email: user.email,
      phone: formData.phone,
      post_name: selectedPost.post_name
    };

    try {
      await axios.post(
        'http://localhost:5000/candidates',
        candidateData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Candidate added successfully!');
    } catch (error) {
      console.error('Failed to add candidate:', error);
      alert('Failed to add candidate.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: '20px' }}>
            <div>
              <strong>{user.name}</strong> - {user.email} - {user.role}
            </div>
            <div>
              <Link to={`/admin/edit-user/${user._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </div>

            {/* Candidate assignment form */}
            <form
              onSubmit={(e) => handleMakeCandidate(e, user)}
              style={{ marginTop: '10px' }}
            >
              <select
                value={candidatePost[user._id]?.postId || ''}
                onChange={(e) =>
                  setCandidatePost((prev) => ({
                    ...prev,
                    [user._id]: {
                      ...prev[user._id],
                      postId: e.target.value
                    }
                  }))
                }
                required
              >
                <option value="">Assign Post</option>
                {posts.map((post) => (
                  <option key={post._id} value={post._id}>
                    {post.post_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Phone number"
                value={candidatePost[user._id]?.phone || ''}
                onChange={(e) =>
                  setCandidatePost((prev) => ({
                    ...prev,
                    [user._id]: {
                      ...prev[user._id],
                      phone: e.target.value
                    }
                  }))
                }
                required
                style={{ marginLeft: '10px' }}
              />

              <button type="submit" style={{ marginLeft: '10px' }}>
                Make Candidate
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
