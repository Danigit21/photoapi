const express = require('express');
const router = express.Router();
const controller = require('../controllers/album_controller');

/* Get all resources */
router.get('/', controller.index);

/* Get a specific resource */
router.get('/:albumId', controller.show);

/* Store a new resource */
router.post('/', controller.store);

/* Update a specific resource */
router.put('/:albumId', controller.update);

/* Destroy a specific resource */
// router.delete('/:authorId', controller.destroy);

module.exports = router;