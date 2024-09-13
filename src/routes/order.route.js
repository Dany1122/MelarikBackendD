const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
const { createOrder, getOrderHistoryByUserId } = require("../controllers/order.controller");
const { validateJWT } = require("../middlewares/validateJWT.middle");

router.post('/create',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        check('full_name', 'El nombre es obligatorio').not().isEmpty(),
        check('address', 'La dirección es obligatoria').not().isEmpty(),
        check('country', 'El país es obligatorio').not().isEmpty(),
        check('phone_number', 'El número de teléfono es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    createOrder
);

router.post('/getOrderHistoryByUserId',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    getOrderHistoryByUserId
);

module.exports = router;