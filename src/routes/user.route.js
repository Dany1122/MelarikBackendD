const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { getUserById } = require('../controllers/user.controller');
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
const { validateJWT } = require("../middlewares/validateJWT.middle");

router.post('/getUserById',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    getUserById
)


module.exports = router;