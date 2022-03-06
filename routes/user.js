const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller');
const validationRules = require('../validation/user');

/* Get all resources */
// router.get('/', controller.index);

/* Get a specific resource */
// router.get('/:userId', controller.show);

/* Store a new resource */
router.post('/', controller.store);

/* Update a specific resource */
// router.put('/:userId',controller.update, validationRules.updateRules);

/* Destroy a specific resource */
// router.delete('/:userId', controller.destroy);

module.exports = router;