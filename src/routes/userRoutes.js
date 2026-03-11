const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/', userCtrl.createUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserById);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.softDeleteUser);

// enable/disable endpoints
router.post('/enable', userCtrl.enableUser);
router.post('/disable', userCtrl.disableUser);

module.exports = router;