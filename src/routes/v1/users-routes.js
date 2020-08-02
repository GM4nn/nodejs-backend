const express = require('express');
const { isAuth,isValidHostName,isAdmin} = require('../../middlewares/auth');
const usersController = require('../../controllers/v1/users-controller');

const router = express.Router();
//router como tipo post
router.post('/create', usersController.createUser); //paso usersController
router.post('/delete', isAuth ,isAdmin, usersController.deleteUser);
router.post('/update', isValidHostName ,isAuth, usersController.updateUser);
router.get('/get-all',isAuth ,isAdmin,  usersController.getUsers);
router.post('/login',usersController.login);
module.exports = router;
