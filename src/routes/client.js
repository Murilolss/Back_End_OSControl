import { Router } from "express";
import { ClientController } from '../controllers/client.js'

const route = new Router();

route.post('/', ClientController.store);
route.get('/', ClientController.index);

export default route;