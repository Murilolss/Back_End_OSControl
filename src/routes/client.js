import { Router } from "express";
import { ClientController } from '../controllers/client.js'

const route = new Router();

route.post('/', ClientController.store);
route.get('/:id', ClientController.show);
route.delete('/:id', ClientController.del);
route.get('/', ClientController.index);

export default route;