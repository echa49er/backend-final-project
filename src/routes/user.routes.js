import express from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = express.Router();

// Get a user by ID
router.get('/:id', UserController.getUser);

// Create a new user
router.post('/', UserController.createUser);  

// Update user by ID
router.put('/:id', UserController.updateUser);

// Delete user by ID
router.delete('/:id', UserController.deleteUser);

export default router;
