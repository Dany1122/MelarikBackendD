module.exports = (sequelize, Sequelize, Role) => {
    const User = sequelize.define('User',{
        name:{
            type : Sequelize.STRING,
            
        },
        lastname: {
            type: Sequelize.STRING,
            
        },
        email : {
            type : Sequelize.STRING
        },
        password: {
            type : Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        address: {
            type: Sequelize.STRING,
        },
        billingaddress: {
            type: Sequelize.STRING,
        },
        brands: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.STRING,
        },
        role_id: {
            type : Sequelize.INTEGER,
            // references : {
            //     model : Role,
            //     key : 'id'
            // }
        },
        active : {
            type : Sequelize.BOOLEAN,
            defaultValue : true,
            allowNull : false
        }
    },{
        freezeTableName : true,
    });
    return User;
}