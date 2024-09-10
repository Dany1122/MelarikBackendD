const categoriesService = require("../services/categories.service");
const httpUtilsService = require("../services/http-utils.service");
const HTTP_STATUS = require('../enums/http-status.enum');


const getAllCategories = async (req, res, next) => {
    
    
    try {
        // Usa el método findAll de Sequelize para obtener todas las categorías
        const categories = await categoriesService.getAllcategories();
        
        // Envía las categorías como respuesta
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Categorías obtenidas correctamente',
            categories
        });
    } catch (error) {
        // Maneja los errores
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

module.exports = {
    getAllCategories
}