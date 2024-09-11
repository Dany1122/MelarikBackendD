module.exports = (sequelize, Sequelize, cart, products) => {
    const CartItem = sequelize.define('cart_item', {
        cart_id: {
            type: Sequelize.INTEGER,
            references: {
                model: cart,
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
            defaultValue: 1
        }
    }, {
        freezeTableName: true
    });

    return CartItem;
};