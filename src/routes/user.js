import { Router } from 'express';
import { UserController } from '../controllers/user.js'

const route = new Router();

route.post('/', UserController.store);
route.get('/', UserController.index);
route.get('/:id', UserController.show);
route.delete('/:id', UserController.del);
route.put('/:id', UserController.update);


export default route;