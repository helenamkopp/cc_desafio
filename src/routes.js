const express = require('express');
const routes = express.Router();

const PaymentController = require('./controllers/PaymentController')

routes.get('/payments', PaymentController.index);
routes.get('/payments/:id', PaymentController.show);
routes.post('/payments', PaymentController.store);
routes.put('/payments/:id', PaymentController.update);
routes.delete('/payments/:id', PaymentController.destroy);


module.exports = routes;