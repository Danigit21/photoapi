// Photos route

const express = require('express');
const router = express.Router();
const controller = require('../controllers/photo_controller');
const validationRules = require('../validation/photo');

// Get all resources
router.get('/', controller.index);

// Get a specific resource
router.get('/:photoId', controller.show);

// Store a new resource
router.post('/', validationRules.createRules, controller.store);

// Update a specific resource
router.put('/:photoId', validationRules.updateRules, controller.update);

module.exports = router;