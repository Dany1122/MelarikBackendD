const { dbMysqlConnection } = require("../database/db.mysql.config");
const User = dbMysqlConnection().user;
const Role = dbMysqlConnection().role;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (request) => {
    const user = {
        name : request.name.trim(),
        email : request.email.trim(),
        password : request.password,
        role_id : request.role_id
    };

    return await User.create(user);
};

const getUserByEmail = async (email) => {
    return await User.findOne({
        where : {
            email
        }
    })
};

const getAllUsers = async () => {
    return await User.findAll();
};

const validateToken = (token) => {
    try {
        if (!token) {
            return 0; // Token no existe
        }

        // Verificar el token
        jwt.verify(token, process.env.SECRET_JWT);
        return 1; // Token válido
    } catch (error) {
        return 0; // Token inválido
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    validateToken
}