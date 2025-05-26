const express = require('express');
const router = express.Router();
const { client } = require('../config/paypal.config');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// Crear orden de pago
router.post('/create-order', async (req, res) => {
  const { total } = req.body;

  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'MXN',
        value: total.toString()
      }
    }]
  });

  try {
    const response = await client().execute(request);
    res.json({ id: response.result.id });
    console.log(response.result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear la orden");
  }
});


router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;

  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const response = await client().execute(request);
    res.json(response.result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al capturar el pago");
  }
});
module.exports = router;