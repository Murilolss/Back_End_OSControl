import { Router } from "express";
import { ClientController } from '../controllers/client.js'

const route = new Router();

route.post('/', ClientController.store);
route.get('/:id', ClientController.show);
route.get('/', ClientController.index);
route.delete('/:id', ClientController.del);
route.put('/:id', ClientController.update);

export default route;