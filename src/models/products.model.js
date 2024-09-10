module.exports = (sequelize, Sequelize, categories ) => {
    const Products = sequelize.define('productos',{
        name_product:{
            type : Sequelize.STRING,
            
        },
        description:{
            type : Sequelize.STRING,
            
        },
        price:{
            type : Sequelize.INTEGER,
            
        },
        stock:{
            type : Sequelize.INTEGER,
            
        },
        url_image: {
            type : Sequelize.STRING,
            defaultValue : false
        },
        category_id:{
            type : Sequelize.INTEGER,
            // references: {
            //     model: categories,
            //     key: 'id'
            // }
        },
    },
    {
        freezeTableName: true
    });
    return Products;
}