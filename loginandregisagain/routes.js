const router = require('express').Router();
const body = require('express-validator');
const register = require('./controllers/resgisterControllers');
const login = require('./controllers/loginControllers');
const getUser = require('./controllers/getUserControllers');

router.post('/register', [
    body.check('name').isLength({ min: 3 }).notEmpty().escape().trim().withMessage('Name must be at least 3 characters long'),
    body.check('email').isEmail().notEmpty().escape().trim().withMessage('Email is not valid'),
    body.check('password').isLength({ min: 6 }).notEmpty().escape().trim().withMessage('Password must be at least 6 characters long')
], register);

router.post('/login', [
    body.check('email').isEmail().notEmpty().escape().trim().withMessage('Email is not valid'),
    body.check('password').isLength({ min: 6 }).notEmpty().escape().trim().withMessage('Password must be at least 6 characters long')
], login);

router.get('/getUser', getUser);

module.exports = router;