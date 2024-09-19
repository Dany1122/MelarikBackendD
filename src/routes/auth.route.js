const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { loginUser, validateToken } = require('../controllers/auth.controller');
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').trim().notEmpty(),
        fieldValidator
    ],
    loginUser

);

router.post('/validateToken',
    [
        check('token', 'El token es obligatorio').trim().notEmpty(),
        fieldValidator
    ],
    validateToken
);

module.exports = router;