module.exports = (sequelize, Sequelize, Role) => {
    const User = sequelize.define('User',{
        name:{
            type : Sequelize.STRING
        },
        email : {
            type : Sequelize.STRING
        },
        password: {
            type : Sequelize.STRING
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