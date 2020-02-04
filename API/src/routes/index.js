const { Router } = require('express');
const router = Router();

const { getUsers, setUser, getUserById, delUserById } = require('../controllers/index.controller');

module.exports = router;

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

router.post('/users', setUser);

router.delete('/users/:id', delUserById);