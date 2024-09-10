const { dbMysqlConnection } = require("../database/db.mysql.config");
const User = dbMysqlConnection().user;
const Role = dbMysqlConnection().role;

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

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
}