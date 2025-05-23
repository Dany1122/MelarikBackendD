const express = require('express');

// ✅ Solo usa .env en desarrollo
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors');
const cron = require('node-cron');
const { dbMysqlConnection } = require('./src/database/db.mysql.config');
const path = require('path');

const app = express();

// 🔄 Conexión y sincronización con MySQL
const db = dbMysqlConnection();
db.sequelize.sync({ alter: true }).then(() => {
  require('./src/database/db.mysql.data.default')(db);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Rutas
app.use('/api/auth', require('./src/routes/auth.route'));
app.use('/api/categories', require('./src/routes/categories.route'));
app.use('/api/products', require('./src/routes/products.route'));
app.use('/api/cart', require('./src/routes/cart.route'));
app.use('/api/order', require('./src/routes/order.route'));
app.use('/api/user', require('./src/routes/user.route'));
app.use('/api/admin', require('./src/routes/admin.route'));
app.use('/api/paypal', require('./src/routes/paypal.route'));

// Catch-all para SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV}`);
});