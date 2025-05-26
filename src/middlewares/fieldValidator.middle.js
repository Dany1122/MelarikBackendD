const { response } = require('express');
const HTTP_STATUS = require('../enums/http-status.enum');
const httpUtilesService = require('../services/http-utils.service');
const { validationResult } = require('express-validator');

const fieldValidator = (req, res = response, next) => {

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        return httpUtilesService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
            errors : errors.mapped()
        })
    }
    next();
};

module.exports = {
    fieldValidator
}