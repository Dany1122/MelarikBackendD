const orderService = require('../services/order.service');
const httpUtilsService = require('../services/http-utils.service');
const HTTP_STATUS = require('../enums/http-status.enum');

const createOrder = async (req, res) => {
    try {
        const { 
            userId, 
            full_name, 
            address, 
            country, 
            phone_number, 
            deliveryType, 
            coupon, 
            paymentMethod, 
            creditCardNumber, 
            creditCardExpiry, 
            creditCardCVV,
            deliveryOption,
            nameOnCard
        } = req.body;
        // console.log(userId, full_name, address, country, phone_number);
        
        const order = await orderService.createOrder(userId, { full_name, address, country, phone_number, deliveryType, coupon, paymentMethod, creditCardNumber, creditCardExpiry, creditCardCVV, deliveryOption, nameOnCard });
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Orden creada correctamente',
            order
        });
    } catch (error) {
        console.log(error);

        if (error.message === 'Cart not found') {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
                errors: [{
                    msg: 'El carrito no existe'
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

const getOrderHistoryByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderService.getOrderHistoryByUserId(userId);
        return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg: 'Ordenes obtenidas correctamente',
            orders
        });
    } catch (error) {
        console.log(error);
        
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, {
            errors: [{
                msg: 'Por favor hable con el administrador'
            }]
        });
    }
};

module.exports = {
    createOrder,
    getOrderHistoryByUserId
};