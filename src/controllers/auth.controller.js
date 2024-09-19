const { response } = require("express");
const userService = require('../services/user.service')
const httpUtilsService = require('../services/http-utils.service');
const HTTP_STATUS = require('../enums/http-status.enum');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jsonWebToken.helper");

const loginUser = async (req, res = response) => {
    const params = req.body;

    // console.log(params);
    

    try {
        let user = await userService.getUserByEmail(params.email);

        if (!user) {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
                errors : [{
                    msg : 'no existe el correo electronico'
                }]
            } )
        }

        //validate password
        const validPassword = user.password === params.password
        console.log(params.password,user.password);
        

        if (!validPassword) {
            return httpUtilsService.httpResponse(res, HTTP_STATUS.BAD_REQUEST, false, {
                errors : [{
                    msg : 'Constraseña incorrecta'
                }]
            })
        }

        const token = await generateJWT(user.id, user.name);
        httpUtilsService.httpResponse(res, HTTP_STATUS.OK,true, {
            uid : user.id,
            name : user.name,
            token
        })

        //Generar JWT
    } catch (error) {
        console.log(error);
        httpUtilsService.httpResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR,false, {
            errors:[{
                msg: 'por favor hable con el administrador'
            }]
        })
        
    }
};

const validateToken = async (req, res = response) => {
    const {token} = req.body;
    
    const validateToken = userService.validateToken(token);
    if (validateToken) {
        httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
            msg : 'Token valido',
            validateToken
        })
    } else {
        httpUtilsService.httpResponse(res, HTTP_STATUS.UNAUTHORIZED, false, {
                msg : 'Token no valido',
                validateToken
        })
    }
}

module.exports = {
    loginUser,
    validateToken
}