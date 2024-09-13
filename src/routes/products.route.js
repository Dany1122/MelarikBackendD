const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");

const { getAllProducts, getProductById, getProductByCategory } = require("../controllers/products.controller");
const { validateJWT } = require("../middlewares/validateJWT.middle");

router.post('/getAll',

    [
        validateJWT
    ],
     getAllProducts
);

router.post('/getByCategory',
    [
        validateJWT,
        check('category_id', 'El id de la categoria es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    getProductByCategory
);




module.exports = router;