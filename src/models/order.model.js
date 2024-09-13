module.exports = (sequelize, Sequelize, user) => {
    const Order = sequelize.define('order', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: user,
                key: 'id'
            }
        },
        total_price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'pending'
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Order;
};