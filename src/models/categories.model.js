module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define('categories',{
        name_category:{
            type : Sequelize.STRING,
        },
    },
    {
        freezeTableName: true
    });
    return Categories;
}