const express = require('express');
const router = express.Router();
const controller = require('../controllers/photo_controller');
const validationRules = require('../validation/example');

/* Get all resources */
router.get('/', controller.index);

/* Get a specific resource */
router.get('/:photoId', controller.show);

/* Store a new resource */
router.post('/', controller.store,validationRules.createRules);

/* Update a specific resource */
router.put('/:photoId', controller.update, validationRules.updateRules);

/* Destroy a specific resource */
// router.delete('/:bookId', controller.destroy);

module.exports = router;