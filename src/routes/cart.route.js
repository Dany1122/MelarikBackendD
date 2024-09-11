const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
const { getCartByUserId, addProuctToCart, decreaseProductInCart, clearCart } = require("../controllers/cart.controller");
const { validateJWT } = require("../middlewares/validateJWT.middle");


router.post('/getCartByUserId',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    getCartByUserId
);

router.post('/add',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        check('productId', 'El id del producto es obligatorio').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    addProuctToCart
);

router.post('/decrease',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        check('productId', 'El id del producto es obligatorio').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    decreaseProductInCart
);

router.post('/clear',
    [
        validateJWT,
        check('userId', 'El id del usuario es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    clearCart
);

module.exports = router;