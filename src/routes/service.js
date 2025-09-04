import { Router } from 'express';
import { ServiceController } from '../controllers/service.js'

const route = new Router();

route.post('/', ServiceController.store);

export default route;