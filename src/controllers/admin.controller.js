const userService = require("../services/user.service");
const productService = require("../services/products.service");
const httpUtilsService = require('../services/http-utils.service');
const HTTP_STATUS = require('../enums/http-status.enum');

// Obtener todos los usuarios (Solo Admin)
const getAllUsers = async (req, res) => {
     try {
            // Usa el método findAll de Sequelize para obtener todas las categorías
            const users = await userService.getAllUsers();
            
            // Envía las categorías como respuesta
            return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
                msg: 'Usuarios obtenidos correctamente',
                users
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

// Crear un nuevo producto (Solo Admin)
const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

// Eliminar un producto (Solo Admin)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};

module.exports = {
    getAllUsers,
    createProduct,
    deleteProduct
};