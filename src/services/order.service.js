const { dbMysqlConnection } = require("../database/db.mysql.config");
const roleEnum = require("../enums/role.enum");
const Order = dbMysqlConnection().order;
const OrderItem = dbMysqlConnection().orderItem;
const Cart = dbMysqlConnection().cart;
const CartItem = dbMysqlConnection().cartItem;
const Products = dbMysqlConnection().products;
const User = dbMysqlConnection().user;
const Role = dbMysqlConnection().role;

const createOrder = async (userId, orderData) => {
    
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [{
                model: CartItem,
                include: [Products]
            }]
        });

        if (!cart  ||cart.cart_items.length === 0) {
            await Cart.destroy({ where: { user_id: userId } });
            throw new Error('Cart not found');
        }

        let totalPrice = 0;
        const orderItems = cart.cart_items.map(item => {
            totalPrice += item.quantity * item.producto.price;
            return {
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.producto.price
            };
        });

         // Calculate delivery cost
         let deliveryCost = 0;
         if (orderData.deliveryType === 'DHL') {
             deliveryCost = 150; // Example cost for DHL
         } else if (orderData.deliveryType === 'FedEx') {
             deliveryCost = 200; // Example cost for FedEx
         } else if (orderData.deliveryType === 'Estafeta') {
                deliveryCost = 120; // Example cost for Estafeta
         } else if (orderData.deliveryType === 'Express') {
            deliveryCost = 200; // Example cost for UPS
         }
         totalPrice += deliveryCost;

         // Apply coupon discount
        if (orderData.coupon) {
            let discount = 0;
            if (orderData.coupon === '5%') {
                discount = 0.05;
            } else if (orderData.coupon === '10%') {
                discount = 0.10;
            } else if (orderData.coupon === '15%') {
                discount = 0.15;
            }
            totalPrice -= totalPrice * discount;
        }

        const order = await Order.create({
            user_id: userId,
            total_price: totalPrice,
            status: 'confirmado',
            full_name: orderData.full_name,
            address: orderData.address,
            country: orderData.country,
            phone_number: orderData.phone_number,
            delivery_type: orderData.deliveryType,
            coupon: orderData.coupon,
            payment_method: orderData.paymentMethod,
            credit_card_number: orderData.creditCardNumber,
            credit_card_expiry: orderData.creditCardExpiry,
            credit_card_cvv: orderData.creditCardCVV,
            delivery_option: orderData.deliveryOption,
            name_on_card: orderData.nameOnCard
            
        });

        await OrderItem.bulkCreate(orderItems.map(item => ({
            ...item,
            order_id: order.id
        })));

        // Clear the cart
        await CartItem.destroy({ where: { cart_id: cart.id } });
        await Cart.destroy({ where: { id: cart.id } });

        return order;
    } catch (error) {
        throw error;
    }
};

const getOrderHistoryByUserId = async (userId) => {
    try {
        // Obtén el rol del usuario
        const user = await User.findOne({
            where: { id: userId },
            include: [Role]
        });

        if (!user) {
            throw new Error('User not found');
        }

        let orders;
        
        if (user.Role.role_dsc === 'Admin') {
            debugger;
            // Si el usuario es administrador, obtiene todas las órdenes
            orders = await Order.findAll({
                include: [{
                    model: OrderItem,
                    include: [Products]
                }]
            });
        } else {
            // Si no, obtiene solo las órdenes del usuario específico
            orders = await Order.findAll({
                where: { user_id: userId },
                include: [{
                    model: OrderItem,
                    include: [Products]
                }]
            });
        }

        const ordersWithTotalProducts = orders.map(order => {
            const totalProducts = order.order_items.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...order.toJSON(),
                totalProducts
            };
        });

        return ordersWithTotalProducts;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrder,
    getOrderHistoryByUserId
};