import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postName, setPostName] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const token = localStorage.getItem('token'); // Assumes token is set after login

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async () => {
    try {
      if (!postName.trim()) return;

      if (editingPost) {
        await axios.put(
          `http://localhost:5000/posts/${editingPost._id}`,
          { post_name: postName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/posts',
          { post_name: postName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setPostName('');
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err.response?.data || err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setPostName(post.post_name);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleCancel = () => {
    setPostName('');
    setEditingPost(null);
  };

  return (
    <div>
      <h2>Manage Posts</h2>

      <div>
        <input
          type="text"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          placeholder="Enter post name"
        />
        <button onClick={handleSave}>{editingPost ? 'Update' : 'Add'}</button>
        {editingPost && <button onClick={handleCancel}>Cancel</button>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Post Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.post_name}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
