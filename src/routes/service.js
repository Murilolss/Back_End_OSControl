import { Router } from 'express';
import { ServiceController } from '../controllers/service.js'

const route = new Router();

route.post('/', ServiceController.store);
route.get('/', ServiceController.index);
route.get('/:id', ServiceController.show);

export default route;