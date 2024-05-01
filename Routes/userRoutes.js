import express from 'express';
import * as userController from '../Controller/userController.js'

const router = express.Router();

//Get users
router.get('/', userController.getAllUsers);


//Get user id
router.get('/getUserByID', userController.getAllUsers);

//create user
router.post('/', userController.createUser);

//login
router.post('/login', userController.login);

export default router;