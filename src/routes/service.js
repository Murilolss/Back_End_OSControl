import { Router } from 'express';
import { ServiceController } from '../controllers/service'

const route = new Router();

Router.post('/', ServiceController.store);

export default route;