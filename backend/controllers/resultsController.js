const Result = require('../models/results');
const Candidate = require('../models/Candidates');

// Create new result
exports.createResult = async (req, res) => {
  try {
    const { candidate_id, score } = req.body;

    // Check if candidate exists
    const candidate = await Candidate.findById(candidate_id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const result = new Result({
      candidate_id: candidate._id,
      candidate_name: candidate.name,
      post_name: candidate.post_name,
      score: score
      // status is auto-handled in schema pre-save
    });

    await result.save();
    res.status(201).json({ message: 'Result created successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating result' });
  }
};

// Get all results
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate('candidate_id', 'name email');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results' });
  }
};

// Get result by ID
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('candidate_id');
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving result' });
  }
};

exports.getResultsByCandidateName = async (req, res) => {
  try {
    const candidateName = req.query.name;

    if (!candidateName) {
      return res.status(400).json({ message: "Candidate name is required" });
    }

    const results = await Result.find({ candidate_name: candidateName });

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found for this candidate" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching candidate results:", err);
    res.status(500).json({ message: "Server error while fetching results" });
  }
};

// Update result
exports.updateResult = async (req, res) => {
  try {
    const { score } = req.body;

    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    result.score = score;
    result.status = score >= 50 ? 'Pass' : 'Fail';

    await result.save();
    res.status(200).json({ message: 'Result updated successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating result' });
  }
};

// Delete result
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting result' });
  }
};
