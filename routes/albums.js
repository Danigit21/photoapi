// Albums route

const express = require('express');
const router = express.Router();
const controller = require('../controllers/album_controller');
const validationRules = require('../validation/album');

// Get all resources
router.get('/', controller.index);

// Get a specific resource
router.get('/:albumId', controller.show);

// Store a new resource
router.post('/', validationRules.createRules, controller.store);

// Attach new resource to another resource
router.post('/:albumId/photos', validationRules.attachPhotoRules, controller.attachPhoto);

// Update a specific resource
router.put('/:albumId', validationRules.updateRules, controller.update);

module.exports = router;