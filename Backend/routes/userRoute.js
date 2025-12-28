const express = require('express');
const router = express.Router();
const { addUser, updateUser, deleteUser } = require('../controllers/userController'); // recupère la fonction addUser depuis le userController.js
const { getUsers } = require('../controllers/userController');
const { getOneUser } = require('../controllers/userController');


router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getOneUser);

router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

module.exports = router;