const TypeRole = require('../enums/role.enum');
const typeCategory = require('../enums/category.enum');


module.exports = async ( db ) => {
    const Role = db.role;
    const User = db.user;
    const Categories = db.categories
    const Products = db.products;
    const Cart = db.cart;
    const CartItem = db.cartItem;

    Role.findOrCreate({ where : { id : 1}, defaults : { id : 1, role_dsc: 'Admin', active : true, deleted : false}});
    Role.findOrCreate({ where : { id : 2}, defaults : { id : 2, role_dsc: 'User', active : true, deleted : false}});
    User.findOrCreate({ where : { id : 1}, defaults : { id : 1, name : 'Admin', email : 'admin@admin.com' , password : 'admin123', role_id : TypeRole.ADMIN, active : true}});
    User.findOrCreate({ where : { id : 100}, defaults : { id : 100, name : 'Erick Ramos', email : 'erick@erick.com' , password : 'erick123', role_id : TypeRole.USER, active : true}});
    Categories.findOrCreate({ where : { id : 1}, defaults : { id: 1, name_category : 'Prebases' }});
    Categories.findOrCreate({ where : { id : 2}, defaults : { id: 2, name_category : 'Bases de maquillaje' }});
    Categories.findOrCreate({ where : { id : 3}, defaults : { id: 3, name_category : 'Correctores' }});
    Categories.findOrCreate({ where : { id : 4}, defaults : { id: 4, name_category : 'Delineadores' }});
    Categories.findOrCreate({ where : { id : 5}, defaults : { id: 5, name_category : 'Brochas y esponjas' }});
    Categories.findOrCreate({ where : { id : 6}, defaults : { id: 6, name_category : 'Rubores' }});

    Products.findOrCreate({ where : { id : 1}, defaults : { id: 1, name_product : 'Oil Free Natural Finish Foundation', description : 'Es una base de maquillaje que nutre y protege la piel al mismo tiempo, puesto que está enriquecida con antioxidantes y vitamina E', price : 232, stock : 100, url_image: 'https://media.glamour.mx/photos/619060882d97bd4c522a4acf/master/w_1600,c_limit/248347.jpg', category_id : typeCategory.BASES }});
    Products.findOrCreate({ where : { id : 2}, defaults : { id: 2, name_product : 'Age Defying 3X Base Líquida de Maquillaje', description : 'Si tienes más de 35 años y estás en modo ahorro, dale una oportunidad a esta base de maquillaje de supermercado que hidrata como si te pusieras una crema', price : 329, stock : 100, url_image: 'https://media.glamour.mx/photos/619060882d97bd4c522a4ad1/master/w_1600,c_limit/248348.jpg', category_id : typeCategory.BASES }});
    Products.findOrCreate({ where : { id : 3}, defaults : { id: 3, name_product : 'Silk Foundation Elixir Organic Wear', description : 'Rica en aloe vera, aceite de coco, aceite de jojoba y otros nutrientes para la piel, esta base es una de nuestras favoritas porque su textura ligera se funde perfectamente en el rostro y lo deja saludable, luminoso y uniforme', price : 399, stock : 100, url_image: 'https://media.glamour.mx/photos/61906087a6e030d6480f6e41/master/w_1600,c_limit/248349.jpg', category_id : typeCategory.BASES }});
    Products.findOrCreate({ where : { id : 4}, defaults : { id: 4, name_product : 'MAYBELLINE fit me! primer matte & poreless, color transparente', description : 'Con una cobertura media, esta base de maquillaje es perfecta para quienes buscan un acabado natural y luminoso', price : 219, stock : 100, url_image: 'https://m.media-amazon.com/images/I/417vUzzp4+L._AC_SL1130_.jpg', category_id : typeCategory.PREBASES }});
    Products.findOrCreate({ where : { id : 5}, defaults : { id: 5, name_product : 'Corrector LA Girl Pro Conceal', description : 'Corrector LA Girl HD Pro Conceal cuenta con 43 colores ideales para todos los tonos de piel. Son resistentes a las arrugas y su formular es cremosa pero ligera.', price : 49, stock : 100, url_image: 'https://centralmakeup.mx/wp-content/uploads/2020/06/corrector-la-girl.jpg', category_id : typeCategory.CORRECTORES }});
    Products.findOrCreate({ where : { id : 6}, defaults : { id: 6, name_product : 'MACQUEEN - MQNY Delineador de ojos', description : 'Lápiz eyeliner de punta fina que crea líneas profundas, intensas y definidas. Su fórmula líquida y resistente al agua crea unos trazos finos y suaves que pueden edificarse para dar un mayor énfasis a la mirada.', price : 96, stock : 100, url_image: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/83/556/XXL_p0209955683.png', category_id : typeCategory.DELINEADORES }});
    Products.findOrCreate({ where : { id : 7}, defaults : { id: 7, name_product : 'Real Techniques, Everyday Essentials, Set de Brochas de Maquillaje con Esponja Multifuncional,', description : 'Kit esencial. El set everyday essentials de real techniques es lo que necesitas para dominar tu look en todos los sentidos, maquillar tu rostro, mejillas y ojos uniformemente y lucir mejor que nunca sea cual sea la ocasión', price : 365, stock : 100, url_image: 'https://m.media-amazon.com/images/I/61U76RevvIL._AC_SL1400_.jpg', category_id : typeCategory.BROCHAS_ESPONJAS }});
    Products.findOrCreate({ where : { id : 8}, defaults : { id: 8, name_product : 'HANDAIYAN - Mousse Liquid Blush - 6 Colors', description : '', price : 96, stock : 100, url_image: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/59/042/XXL_p0208104259.jpg', category_id : typeCategory.RUBORES }});

    // Cart.findOrCreate({ where : { id : 1}, defaults : { id: 1, user_id : 1}});
    // CartItem.findOrCreate({ where : { id : 1}, defaults : { id: 1, cart_id : 1, product_id : 1, quantity : 1}});
    // CartItem.findOrCreate({ where : { id : 2}, defaults : { id: 2, cart_id : 1, product_id : 2, quantity : 1}});
}