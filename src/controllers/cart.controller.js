const cartService = require("../services/cart.service");
const httpUtilsService = require("../services/http-utils.service");
const HTTP_STATUS = require('../enums/http-status.enum');

const getCartByUserId = async (req, res, next) => {
    try {
        
        const userId = req.body.userId;
        const cart = await cartService.getCartByUserId(userId);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Carrito obtenido correctamente',
            cart
        });
    } catch (error) {
        console.log('error', error);
        
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const addProuctToCart = async (req, res, next) => {
    try {
        const {userId, productId, quantity, categoryId} = req.body;

        if (quantity <= 0) {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
                errors: [{
                    msg: 'La cantidad debe ser un número positivo'
                }]
            });
        }
        await cartService.addProuctToCart(userId, productId, quantity);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Producto agregado al carrito correctamente'
        });
    } catch (error) {
        console.log('error', error);
        
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const decreaseProductInCart = async (req, res, next) => {
    try {
        const {userId, productId, quantity} = req.body;
        
        if (quantity <= 0) {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
                errors: [{
                    msg: 'La cantidad debe ser un número positivo'
                }]
            });
        }
        await cartService.decreaseProductInCart(userId, productId, quantity);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Producto eliminado del carrito correctamente'
        });
    } catch (error) {
        console.log('error', error);

        if (error.message === 'Product not found in cart') {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.NOT_FOUND, false, {
                errors: [{
                    msg: 'Producto no encontrado en el carrito'
                }]
            });
        }
        
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const clearCart = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        await cartService.clearCart(userId);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Carrito eliminado correctamente'
        });
    } catch (error) {
        console.log('error', error);
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

const removeProductCartById = async (req, res, next) => {
    try {
        const {userId, productId } = req.body

        await cartService.removeProductCartById(userId, productId);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Producto eliminado del carrito correctamente'
        });
    } catch (error) {
        console.log('error', error);

        if (error.message === 'Cart not found') {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.NOT_FOUND, false, {
                errors: [{
                    msg: 'Carrito no encontrado'
                }]
            });
            
        }

        if (error.message === 'Product not found in cart') {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.NOT_FOUND, false, {
                errors: [{
                    msg: 'Producto no encontrado en el carrito'
                }]
            });
        }

        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

module.exports = {
    getCartByUserId,
    addProuctToCart,
    decreaseProductInCart,
    clearCart,
    removeProductCartById
}