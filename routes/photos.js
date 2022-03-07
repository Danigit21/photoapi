const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo');

/* Get all resources */
router.get('/', photoController.index);

/* Get a specific resource */
router.get('/:photoId', photoController.show);

/* Store a new resource */
router.post('/', photoController.store, photoValidationRules.createRules);

/* Update a specific resource */
router.put('/:photoId', photoController.update, photoValidationRules.updateRules);

module.exports = router;