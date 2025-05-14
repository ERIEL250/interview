const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  candidate_name: { type: String, required: true },
  post_name: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, enum: ['Pass', 'Fail'] }
});

// Set "Pass" or "Fail" before saving
resultSchema.pre('save', function (next) {
  this.status = this.score >= 50 ? 'Pass' : 'Fail';
  next();
});

module.exports = mongoose.model('Result', resultSchema);
