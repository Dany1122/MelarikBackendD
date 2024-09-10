const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator.middle");

const { getAllProducts, getProductById, getProductByCategory } = require("../controllers/products.controller");

router.post('/getAll', getAllProducts);




module.exports = router;