import { Router } from 'express';
import { OrderController } from '../controllers/order'

const route = new Router();

Router.post('/', OrderController.store);

export default route;