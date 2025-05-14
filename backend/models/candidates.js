const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // should match the user's email
  phone: { type: String, required: true },
  post_name: { type: String, required: true }
});

module.exports = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);
