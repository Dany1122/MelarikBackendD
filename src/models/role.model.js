module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role',{
        role_dsc : {
            type : Sequelize.STRING
        },
        active:{
            type : Sequelize.BOOLEAN,
            defaultValue : true
        },
        deleted :{
            type : Sequelize.BOOLEAN,
            defaultValue : false
        }
    },
    {
        freezeTableName: true
    });
    return Role;
}