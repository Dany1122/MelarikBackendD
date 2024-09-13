module.exports = (sequelize, Sequelize, order, products) => {
    const OrderItem = sequelize.define('order_item', {
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: order,
                key: 'id'
            }
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: products,
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return OrderItem;
};