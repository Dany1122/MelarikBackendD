const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cron = require('node-cron');
const { dbMysqlConnection } = require('./src/database/db.mysql.config');

//create express server
const app = express();

const path = require('path');

//database sync
const db = dbMysqlConnection();
db.sequelize.sync({force : true}).then(() => {
    // require('./src/database/db.mysql.data.default')(db);
}); 


//CORS
app.use(cors());

//Directorio publico

app.use(express.static(__dirname + '/public'));

//read and parse body
app.use(express.json());



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'), function (err,){
        if (err) {
            res.status(500).send(err);
        }
    } );
});

//ROUTES
app.use('/api/auth', require('./src/routes/auth.route'));
app.use('/api/categories', require('./src/routes/categories.route'));
app.use('/api/products', require('./src/routes/products.route'));
app.use('/api/cart', require('./src/routes/cart.route'));
app.use('/api/order', require('./src/routes/order.route'));


const PORT = process.env.PORT || 4000 ;
app.listen(PORT, () => {
    console.log(`Corriendo servidor en el puerto ${process.env.PORT}`);
    console.log(`entorno ${process.env.NODE_ENV}`);
    
} )