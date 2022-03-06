// Photo Validation Rules

const { body } = require('express-validator');
const models = require('../models');

// Create Photo validation rules
const createRules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').optional().isLength({ min: 10, max: 13 }),
    body('comment').optional().isInt({ min: 1 }),
];

// Update Photo validation rules
const updateRules = [
    body('title').optional().isLength({ min: 4 }),
    body('url').optional().isLength({ min: 10, max: 13 }),
    body('comment').optional().isInt({ min: 1 }),
];

module.exports = {
    createRules,
    updateRules,
}