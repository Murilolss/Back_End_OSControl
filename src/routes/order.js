import { Router } from 'express';
import { OrderController } from '../controllers/order.js'

const route = new Router();

route.post('/', OrderController.store);

export default route;