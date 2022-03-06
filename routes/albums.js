const express = require('express');
const router = express.Router();
const controller = require('../controllers/album_controller');
const validationRules = require('../validation/album');

/* Get all resources */
router.get('/', controller.index);

/* Get a specific resource */
router.get('/:albumId', controller.show);

/* Store a new resource */
router.post('/', controller.store, validationRules.createRules);

/* Store a new resource to an album */
// router.post('/:albumId/photos', controller, validationRules);

/* Update a specific resource */
router.put('/:albumId', controller.update, validationRules.updateRules);

module.exports = router;