import { Router } from 'express';
import { OrderController } from '../controllers/order.js'

const route = new Router();

route.post('/', OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', OrderController.show);
route.delete('/:id', OrderController.del);
route.put('/:id', OrderController.update);

export default route;