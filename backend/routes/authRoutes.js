const express = require('express');
const { register, login,getUserProfile,getAllUsers,updateUser,deleteUser,getUserById } = require('../controllers/authController');
const router = express.Router();
const  protect = require('../middlewares/authMiddleware');
const admin  = require('../middlewares/authMiddleware'); // make sure this is a function

router.post('/register', register);
router.post('/login', login);
// Get logged-in user's profile (protected route)
router.get('/profile', protect,admin, getUserProfile);
router.get('/', protect, admin, getAllUsers);         // GET /api/auth/all
router.put('/:id', protect, admin, updateUser);          // PUT /api/auth/:id
router.delete('/:id', protect, admin, deleteUser);       // DELETE /api/auth/:id
router.get('/:id', protect, admin, getUserById);        //
// GET /api/auth/bookings/customer/:customerId







module.exports = router;
