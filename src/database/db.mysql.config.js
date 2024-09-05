const Sequelize = require('sequelize');
const environmnet = require('../enums/environment.enum');

const dbMysqlConnection = () => {
    try {
        let DB = null;
        let USER = null;
        let PASSWORD = null;
        let HOST = null;
        let PORT = null;

        console.log('process.env.NODE_ENV', process.env.NODE_ENV );

        switch (process.env.NODE_ENV) {
            case environmnet.DEV:
                DB = process.env.DB_MYSQL_DATABASE_DEV;
                USER = process.env.DB_MYSQL_USER_DEV;
                PASSWORD = process.env.DB_MYSQL_PASSWORD_DEV;
                HOST = process.env.DB_MYSQL_HOST_DEV;
                PORT = process.env.DB_MYSQL_PORT_DEV;
                break;
        };

        const sequelize =  new Sequelize(DB, USER, PASSWORD,{
            host : HOST,
            dialect : 'mysql',
            port: PORT,
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

        //relations
        db.user.belongsTo(db.role, { foreingKey : 'role_id' });
        db.role.hasMany(db.user, { foreingKey: 'role_id' });

        return db;
        

    } catch (error) {
        console.log('error',error);
        
    }
};

module.exports = {
    dbMysqlConnection
}