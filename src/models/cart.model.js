module.exports = (sequelize, Sequelize, user) => {
    const Cart = sequelize.define('cart', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: user,
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });

    return Cart;
};