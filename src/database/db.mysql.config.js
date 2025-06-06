const Sequelize = require('sequelize');
const environmnet = require('../enums/environment.enum');

const dbMysqlConnection = () => {
    try {
        
        console.log('process.env.NODE_ENV', process.env.NODE_ENV );

        const DB = process.env.MYSQLDATABASE;
        const USER = process.env.MYSQLUSER;
        const PASSWORD = process.env.MYSQLPASSWORD;
        const HOST = process.env.MYSQLHOST;
        const PORT = process.env.MYSQLPORT;

        console.log('🔧 DB config usada en producción:', {
        DB,
        USER,
        PASSWORD,
        HOST,
        PORT
        });
        const sequelize =  new Sequelize(DB, USER, PASSWORD,{
            host : HOST,
            dialect : 'mysql',
            port: Number(PORT),
            operatorsAlianses:false,
            pool : {
                max : 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        const db = {};

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        //tables
        db.role = require('../models/role.model')(sequelize, Sequelize);
        db.user = require('../models/user.model')(sequelize, Sequelize, db.role);
        db.categories = require('../models/categories.model')(sequelize, Sequelize);
        db.products = require('../models/products.model')(sequelize, Sequelize, db.categories);
        db.cart = require('../models/cart.model')(sequelize, Sequelize, db.user);
        db.cartItem = require('../models/cart_item.model')(sequelize, Sequelize, db.cart, db.products);
        db.order = require('../models/order.model')(sequelize, Sequelize, db.user);
        db.orderItem = require('../models/orderItem.model')(sequelize, Sequelize, db.order, db.products);

        //relations
        db.user.belongsTo(db.role, { foreignKey : 'role_id' });
        db.role.hasMany(db.user, { foreignKey: 'role_id' });
        db.products.belongsTo(db.categories, { foreignKey: 'category_id' });

        db.cart.belongsTo(db.user, { foreignKey: 'user_id' });
        db.user.hasOne(db.cart, { foreignKey: 'user_id' });
        db.cartItem.belongsTo(db.cart, { foreignKey: 'cart_id' });
        db.cart.hasMany(db.cartItem, { foreignKey: 'cart_id' });

        db.cartItem.belongsTo(db.products, { foreignKey: 'product_id' });
        db.products.hasMany(db.cartItem, { foreignKey: 'product_id' });

        db.order.belongsTo(db.user, { foreignKey: 'user_id' });
        db.user.hasMany(db.order, { foreignKey: 'user_id' });
        db.orderItem.belongsTo(db.order, { foreignKey: 'order_id' });
        db.order.hasMany(db.orderItem, { foreignKey: 'order_id' });

        db.orderItem.belongsTo(db.products, { foreignKey: 'product_id' });
        db.products.hasMany(db.orderItem, { foreignKey: 'product_id' });

        return db;
        

    } catch (error) {
        console.log('error',error);
        
    }
};

module.exports = {
    dbMysqlConnection
}