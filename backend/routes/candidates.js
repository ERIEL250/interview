const express = require('express');
const router = express.Router();
const {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  getCandidatesByEmail
} = require('../controllers/candController');

const  protect = require('../middlewares/authMiddleware');
const admin = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/verify');

// Public: Create a candidate (registration)
router.post('/',verifyToken,protect,admin, createCandidate);

// Admin only: Manage candidates
router.get('/', protect, admin, getCandidates); // Get all candidates
router.get('/:id', protect, admin, getCandidateById); // Get candidate by ID
router.put('/:id',verifyToken, protect, admin, updateCandidate); // Update candidate
router.delete('/:id',verifyToken, protect, admin, deleteCandidate); // Delete candidate
router.get('/email/:email', verifyToken, protect, admin, getCandidatesByEmail); // Get candidate(s) by email

module.exports = router;
