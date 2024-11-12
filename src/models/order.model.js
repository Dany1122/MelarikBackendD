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
        },
        delivery_type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        delivery_option:{
            type: Sequelize.STRING,
            allowNull: true
        },
        coupon: {
            type: Sequelize.STRING,
            allowNull: true
        },
        payment_method: {
            type: Sequelize.STRING,
            allowNull: true
        },
        credit_card_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        credit_card_expiry: {
            type: Sequelize.STRING,
            allowNull: true
        },
        credit_card_cvv: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name_on_card: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    return Order;
};