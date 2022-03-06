// Album validation rules

const { body } = require('express-validator');

// Create Album validation rules
const createRules = [
    body('title').exists().isLength({ min: 2 }),
];

// Update Album validation rules
const updateRules = [
    body('title').optional().isLength({ min: 2 }),
];

module.exports = {
    createRules,
    updateRules,
}