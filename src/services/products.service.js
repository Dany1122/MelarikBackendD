const { dbMysqlConnection } = require("../database/db.mysql.config")

const products = dbMysqlConnection().products;

const getAllProducts = async () => {
    return await products.findAll();
}

const getProductById = async (id) => {
    return await products.findOne({
        where : {
            id
        }
    })
}

const getProductByCategory = async (category_id) => {
    return await products.findAll({
        where : {
            category_id
        }
    })
}
module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory
}