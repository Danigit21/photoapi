const express = require('express');
const router = express.Router();
const controller = require('../controllers/register_controller');
const validationRules = require('../validation/example');

// GET /
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

// router.use('/example', require('./example'));

// register a user
router.post('/register', controller.register, validationRules.createRules);

module.exports = router;