const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/register_controller');
const validationRules = require('../validation/example');

// GET /
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

// router.use('/example', require('./example'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/users', require('./user'), auth.basic);

// register a user
router.post('/register', controller.register, validationRules.createRules);

module.exports = router;