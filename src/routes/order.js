import { Router } from 'express';
import { OrderController } from '../controllers/order'

const route = new Router();

route.post('/', OrderController.store);

export default route;