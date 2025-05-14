const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultsController');
const verifyToken = require('../middlewares/verify');


router.post('/',verifyToken, resultController.createResult);


// Add this route
router.get('/mine', resultController.getResultsByCandidateName);
router.get('/', resultController.getAllResults);
router.get('/:id', resultController.getResultById);
router.put('/:id',verifyToken, resultController.updateResult);
router.delete('/:id',verifyToken, resultController.deleteResult);

module.exports = router;
