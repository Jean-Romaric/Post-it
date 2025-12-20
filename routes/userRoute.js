const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');
const { getUsers } = require('../controllers/userController');
const { getOneUser } = require('../controllers/userController');


router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/user/:id', getOneUser);
module.exports = router;