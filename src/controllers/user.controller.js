const { response } = require("express");
const userService = require('../services/user.service')
const httpUtilsService = require('../services/http-utils.service');
const HTTP_STATUS = require('../enums/http-status.enum');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jsonWebToken.helper");


const getUserById = async (req, res) => {
    const { userId } = req.body;
    const user = await userService.getUserById(userId);
    return httpUtilsService.httpResponse(res, HTTP_STATUS.OK, true, {
        msg: 'Usuario obtenido correctamente',
        user
    });
}


module.exports = {
    getUserById
}