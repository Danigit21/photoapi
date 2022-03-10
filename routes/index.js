// Index route / User Route

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller');
const validationRules = require('../validation/user');
const auth = require('../middlewares/auth')
// validation rules HAS to be before controller!

// GET /
router.get('/', (req, res, next) => {
	res.send({
		success: true,
		data: {
			msg: 'Hello there!'
		}
	});
});

// register a new user
router.post('/register', validationRules.createRules, controller.register);

router.use('/albums', auth.basic, require('./albums'));
router.use('/photos', auth.basic, require('./photos'));

module.exports = router;