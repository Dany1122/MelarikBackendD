const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
const { getAllCategories } = require("../controllers/categories.controller");
const { validateJWT } = require("../middlewares/validateJWT.middle");

router.post(
    '/getAll',
    [
        // validateJWT,
        fieldValidator
    ],
    getAllCategories
);

module.exports = router;