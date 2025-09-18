import { Router } from 'express';
import { ServiceController } from '../controllers/service.js'

const route = new Router();

route.post('/', ServiceController.store);
route.get('/', ServiceController.index);
route.get('/:id', ServiceController.show);
route.delete('/:id', ServiceController.del);
route.put('/:id', ServiceController.update);

export default route;