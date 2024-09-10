const { dbMysqlConnection } = require("../database/db.mysql.config")

const categories = dbMysqlConnection().categories;

const getAllcategories = async () => {
    return await categories.findAll();
}

module.exports = {
    getAllcategories
}