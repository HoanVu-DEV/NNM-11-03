const express = require('express');
const router = express.Router();
const roleCtrl = require('../controllers/roleController');
const userCtrl = require('../controllers/userController');

router.post('/', roleCtrl.createRole);
router.get('/', roleCtrl.getAllRoles);
router.get('/:id', roleCtrl.getRoleById);
router.put('/:id', roleCtrl.updateRole);
router.delete('/:id', roleCtrl.deleteRole);

// nested users by role
router.get('/:id/users', userCtrl.getUsersByRole);

module.exports = router;