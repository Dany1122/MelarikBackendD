const httpUtilsService = require('../services/http-utils.service');
const HTTP_STATUS = require('../enums/http-status.enum');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token'); 
    
    if (!token) {
        return httpUtilsService.httpResponse(res, HTTP_STATUS.UNAUTHORIZED, false, {
            errors: [{
                msg: 'No hay token en la petición'
            }]
        });
    }

    try {
        const { uid, name, email} = jwt.verify(
            token,
            process.env.SECRET_JWT
        );

        req.uid = uid;
        req.name = name;
        req.email = email;
        
    } catch (error) {
        return httpUtilsService.httpResponse(res, HTTP_STATUS.UNAUTHORIZED, false, {
            errors: [{
                msg: 'Token no válido'
            }]
        });
    }
    next();
};

module.exports = {
    validateJWT
};