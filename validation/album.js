// Album validation rules

const { body } = require('express-validator');
const models = require('../models');

// Create album validation rules
const createRules = [
    body('title').exists().isLength({ min: 3 }),
];

// Update album validation rules
const updateRules = [
    body('title').optional().isLength({ min: 3 }),
];


const attachPhotoRules = [
	body('photo_id').exists().isInt().bail().custom(async value => {
		const photo = await new models.Photo({ id: value }).fetch({ require: false });
		if (!photo) {
			return Promise.reject(`Photo with ID ${value} doesn't exist.`);
		}
		return Promise.resolve();
	}),
];

module.exports = {
    createRules,
    updateRules,
	attachPhotoRules
};