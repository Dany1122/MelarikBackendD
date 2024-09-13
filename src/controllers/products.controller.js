const productsService = require("../services/products.service");
const httpUtilsService = require("../services/http-utils.service");
const HTTP_STATUS = require('../enums/http-status.enum');
const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Productos obtenidos correctamente',
            products
        });
    } catch (error) {
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Producto obtenido correctamente',
            product
        });
    } catch (error) {
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const { category_id } = req.body;
        const products = await productsService.getProductByCategory(category_id);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Productos obtenidos correctamente',
            products
        });
    } catch (error) {
        
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory
}