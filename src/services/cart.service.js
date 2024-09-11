const { dbMysqlConnection } = require("../database/db.mysql.config")
const Cart = dbMysqlConnection().cart;
const cartItemDb = dbMysqlConnection().cartItem;
const products = dbMysqlConnection().products;
const categories = dbMysqlConnection().categories;

const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [{
                model: cartItemDb,
                include: [{
                    model: products,
                    include: [{
                        model: categories,
                    }]
                }]
            }]
        });

        if (!cart) {
            return {
                items: [],
                totalProducts: 0,
                totalPrice: 0,
            };
        }

        
        let totalProducts = 0;
        let totalPrice = 0;
        const items = cart.cart_items.map((item) => {
            totalProducts += item?.quantity;
            totalPrice += item?.quantity * item?.producto?.price;
            return {
                sku : item.producto.id,
                nameProduct : item.producto.name_product,
                description : item.producto.description,
                price : item.producto.price,
                quantity : item.quantity,
                img : item.producto.url_image,
                categoryName : item.producto.category.name_category,
            }
        });

        return {
            items,
            totalProducts,
            totalPrice,
        };
    } catch (error) {
        throw new Error("Error while fetching cart by user id", error);
        
    }
};

const addProuctToCart = async ( userId, productId, quantity) => {
    try {
        const [cart, created] = await Cart.findOrCreate({
            where: { user_id: userId },
            defaults: { user_id: userId }
        });

        // Encuentra el producto
        const product = await products.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Encuentra o crea el CartItem
        const [cartItem, itemCreated] = await cartItemDb.findOrCreate({
            where: { cart_id: cart.id, product_id: productId },
            defaults: { cart_id: cart.id, product_id: productId, quantity: quantity }
        });
        // Si el CartItem ya existe, actualiza la cantidad
        if (!itemCreated) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        return cartItem
    } catch (error) {
        throw error;
    }
};

const decreaseProductInCart = async (userId, productId, quantity) => {
    
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId }
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const cartItem = await cartItemDb.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (!cartItem) {
            throw new Error('Product not found in cart');
        }

        // Disminuir la cantidad del producto
        cartItem.quantity -= quantity;

        // Si la cantidad es menor o igual a 0, elimina el CartItem
        if (cartItem.quantity <= 0) {
            await cartItem.destroy();
        } else { 
            await cartItem.save();
        }

        return cartItem;
    } catch (error) {
        throw error;
    }
};

const clearCart = async (userId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId }
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        await cartItemDb.destroy({
            where: { cart_id: cart.id }
        });


        return { message: 'Cart cleared successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCartByUserId,
    addProuctToCart,
    decreaseProductInCart,
    clearCart
}
