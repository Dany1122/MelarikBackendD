const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");
const { getAllCategories } = require("../controllers/categories.controller");

router.post(
    '/getAll',
    [
        fieldValidator
    ],
    getAllCategories
);

module.exports = router;