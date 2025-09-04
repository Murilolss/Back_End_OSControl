import { Router } from "express";
import { ClientController } from '../controllers/client.js'

const route = new Router();

route.post('/', ClientController.store);

export default route;