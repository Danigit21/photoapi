const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

// GET /
router.get('/', (req, res, next) => {
	res.send({
		success: true,
		data: {
			msg: 'Hello there'
		}
	});
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
// router.use('/users', require('./user'), auth.basic);

// register a user
router.post('/register', userController.register, userValidationRules.createRules);

module.exports = router;