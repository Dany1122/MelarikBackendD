const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { loginUser, validateToken, createUser, sendResetLink, resetPassword } = require('../controllers/auth.controller');
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

router.post('/new', 
    [
        check('name', 'El nombre es obligatorio').trim().notEmpty(),
        check('lastname', 'El apellido es obligatorio').trim().notEmpty(),
        check('phone', 'El teléfono es obligatorio').trim().notEmpty(),
        check('age', 'La edad es obligatoria').isInt(),
        check('email', 'El email es obligatorio').isEmail(),
        check('passwordNew', 'El password es obligatorio y debe contener 6 careteres minimo').isLength({min: 6}),
        check('address', 'La dirección es obligatoria').trim().notEmpty(),
        check('billingAddress', 'La dirección de facturación es obligatoria').trim().notEmpty(),
        check('gender', 'El género es obligatorio').trim().notEmpty(),
        fieldValidator
    ],
    createUser
);

router.post('/sendRecoverLink',
    [
        check('email', 'El email es obligatorio').isEmail(),
        fieldValidator
    ],
    sendResetLink
);

router.post('/recoverPassword',
    [
        check('token', 'El token es obligatorio').trim().notEmpty(),
        check('password', 'El password es obligatorio y debe contener 6 careteres minimo').isLength({min: 6}),
        check('passwordNew', 'Las contraseñas no coinciden').custom((value, { req }) => value === req.body.password),
        fieldValidator
    ],
    resetPassword
);

module.exports = router;