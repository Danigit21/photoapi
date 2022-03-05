// User validation rules

const { body } = require('express-validator');
const models = require('../models');
 
const createRules = [
    body('email').exists().isLength({ min: 2 }).custom(async value => {
        const user = await new models.User({ email : value }).fetch({ require : false });

        if (user) {
            return Promise.reject("Email already exists.");
        }
 
        return Promise.resolve();
    }),

    body('password').exists().isLength({ min: 3 }).trim(),
    body('firstname').exists().isLength({ min: 2 }).trim(),
    body('lastname').exists().isLength({ min: 2 }).trim()
];

// allow only password, firstname, lastname to be updated, only optionally
// we dont want usernames to be changeable
const updateRules = [
    body('password').optional().isLength({ min: 3 }).trim(),
    body('firstname').optional().isLength({ min: 2 }).trim(),
    body('lastname').optional().isLength({ min: 2 }).trim()
];
 
module.exports = {
    createRules,
    updateRules,
}