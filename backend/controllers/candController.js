const Candidate = require('../models/candidates');
const mongoose = require('mongoose');

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, post_name } = req.body;

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      post_name
    });

    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a candidate by ID
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a candidate by ID
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get candidates by email (if needed for matching with user)
exports.getCandidatesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const candidates = await Candidate.find({ email });
    if (!candidates.length) return res.status(404).json({ message: 'No candidates found for the given email' });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
